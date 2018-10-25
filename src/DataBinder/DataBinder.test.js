import DataBinder from './DataBinder'

import { model } from '../model'
import { viewTemplate } from '../template'

test('Create necessary attribute and bind proper value', () => {
  const dataBinder = new DataBinder()
  const view = dataBinder.bind(model, viewTemplate)

  model.label = 'Test'

  expect(view.innerHTML).toBe('Test')
})

test('Create necessary attribute and bind proper value, nested', () => {
  const dataBinder = new DataBinder()
  const view = dataBinder.bind(model, viewTemplate)

  model.x.y.z = 'Test'

  expect(view.getAttribute('title')).toBe('Test')
})

test('Do not bind anything if model property not exist', () => {
  const dataBinder = new DataBinder()
  const view = dataBinder.bind(model, viewTemplate)

  expect(view.src).toBe(undefined)
})

test('Bind empty string', () => {
  const dataBinder = new DataBinder()
  const view = dataBinder.bind(model, viewTemplate)

  expect(view.getAttribute('alt')).toBe('')
})
