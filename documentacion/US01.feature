Feature: Autentication
Scenario2: Lograr tener seguridad al momento de registro
Given que el usuario esta en la pantalla de registro
When el usuario hace click en la caja de texto para poner sus datos
And rellena el nombre, contraseña y correo
Then se mostrara una pantalla con el mensaje "el registro fue exitoso"
