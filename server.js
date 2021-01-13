'use strict';
const path = require('path')
const escpos = require('escpos')
escpos.USB = require('escpos-usb')

const device = new escpos.USB();
const options = { encoding: "GB18030" }
const printer = new escpos.Printer(device, options)

var bodyParser = require('body-parser')
var app = require('express')()
var http = require('http').Server(app)
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())

const port = 4001;

app.post('/print', (req, res) => {
  res.json(
    { status: 'success' }
  )
  console.log(req.body)
  print(req.body)
});

http.listen(port, () => {
  console.log(`Printer: http://localhost:${port}`);
});

const print = (data) => {
  device.open(function () {
  printer.font('a')
  .align('ct')
  .style('bu')
  .size(0, 0)
  .text('Company Name')
  .text('printertest/node_modules/type-fest/source/readonly-deep.d.ts (deflated 57%')
  .text('09-430232423')
  .text('............................................')
  .size(0,0)
  .tableCustom(
    [
      { text:"OrderId: 4092340909", align:"LEFT", width:0.33, style: 'B' },
      { text:"", align:"CENTER", width:0.33},
      { text:new Date().toLocaleDateString(), align:"RIGHT", width:0.33,  }
    ],
    { encoding: 'cp857', size: [1, 1] } // Optional
  )
  .text('')
  .text('............................................')
  .tableCustom(
    [
      { text:"Items", align:"LEFT", width:0.25, style: 'B' },
      { text:"Price", align:"CENTER", width:0.25,  style: 'B'},
      { text:"Qty", align:"RIGHT", width:0.25, style: 'B' },
      { text:"Total", align:"RIGHT", width:0.25, style: 'B' }
    ],
    { encoding: 'cp857', size: [1, 1] } // Optional
  )
  .text('............................................')
  .tableCustom(
    [
      { text:"Orange", align:"LEFT", width:0.25 },
      { text:"2000", align:"CENTER", width:0.25},
      { text:"1", align:"RIGHT", width:0.25 },
      { text:"2000", align:"RIGHT", width:0.25 }
    ],
    { encoding: 'cp857', size: [1, 1] } // Optional
  )
  .tableCustom(
    [
      { text:"Apple", align:"LEFT", width:0.25 },
      { text:"2000", align:"CENTER", width:0.25},
      { text:"1", align:"RIGHT", width:0.25 },
      { text:"2000", align:"RIGHT", width:0.25 }
    ],
    { encoding: 'cp857', size: [1, 1] } // Optional
  )
  .tableCustom(
    [
      { text:"Banana", align:"LEFT", width:0.25 },
      { text:"2000", align:"CENTER", width:0.25},
      { text:"1", align:"RIGHT", width:0.25 },
      { text:"2000", align:"RIGHT", width:0.25 },
    ],
    { encoding: 'cp857', size: [1, 1] } // Optional
  )
  .text('............................................')
  .tableCustom(
    [
      { text:"Sub Total", align:"LEFT", width:0.25 },
      { text:"", align:"CENTER", width:0.25},
      { text:"", align:"RIGHT", width:0.25 },
      { text:"6000", align:"RIGHT", width:0.25 },
    ],
    { encoding: 'cp857', size: [1, 1] } // Optional
  )
  .text('')
  .text("Thanks You !")
  .cut()
  .close()
  });
}