function setAttribute (element, attribute, value) {
  if (attribute === 'innerHTML') {
    element[attribute] = value
  } else {
    element.setAttribute(attribute, value)
  }
}

class Binding {
  constructor (object, property, element, attribute) {
    let _this = this

    this.element = element
    this.value = object[property]
    this.attribute = attribute
    this.valueGetter = function () {
      return _this.value
    }
    this.valueSetter = function (val) {
      _this.value = val
      setAttribute(_this.element, _this.attribute, val)
    }

    Object.defineProperty(object, property, {
      get: this.valueGetter,
      set: this.valueSetter
    })
    object[property] = this.value

    setAttribute(this.element, this.attribute, this.value)
  }
}

class DataBinder {
  r (obj, key, element, attribute) {
    if (key.length > 1) {
      this.r(obj[key.shift()], key, element, attribute)
    } else {
      key = key.shift()
      if (typeof obj[key] !== 'undefined') {
        return new Binding(obj, key, element, attribute)
      }
      return false
    }
  }

  bind (model, viewTemplate) {
    const parser = new DOMParser()
    let template = parser.parseFromString(viewTemplate, 'text/html').body.firstElementChild

    this.r(
      model,
      template.getAttribute('data-bind').split('.'),
      template,
      'innerHTML'
    );

    ['title', 'src', 'alt', 'href'].map((attr) => {
      if (template.getAttribute(`data-bind-${attr}`) !== null) {
        this.r(
          model,
          template.getAttribute(`data-bind-${attr}`).split('.'),
          template,
          attr
        )
      }
    })

    return template
  }
}

export default DataBinder
