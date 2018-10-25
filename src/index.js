import DataBinder from './DataBinder/DataBinder'

import { model } from './model'
import { viewTemplate } from './template'

const dataBinder = new DataBinder()
const view = dataBinder.bind(model, viewTemplate)

model.label = 'That works'
model.x.y.z = 'Changed'
model.src = 'src'

document.getElementById('output').appendChild(view)
