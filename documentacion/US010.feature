Feature: Clients Autentication
Scenario4: Lograr tener seguridad al momento de registro
Given El usuario ya esta en la pantalla post registro
When Se desea saber si la cuenta registrada esta protegida 
And El usuario hace click en "mi informacion" 
Then Se mostrara en su perfil un check que demuestra que su cuenta esta protegida
