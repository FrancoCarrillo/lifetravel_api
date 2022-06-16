Feature: Payment
Scenario3: Hacer un pago seguro
Given El usaurio esta a punto de realizar el pago
When Elige el tipo de pago que va a realizar
And Elige un tipo de tarjeta
And coloca el numero de tarjeta con el codigo
Then se vera una pantalla con el mensaje "pago hecho con exito"
