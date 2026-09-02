# Pagina Web Personal

Activa en ``lucaspoblete.me``

## 🚀 Instalación

Luego de descargar este repositorio, abralo e su terminal en la ruta donde se encuentra

OJO, hay instrucciones que se hacen **SOLO POR PRIMERA VEZ** Y OTRAS QUE SE HACEN **CADA VEZ** que desee ejecutar la APP

### 1. Crear entorno virtual (recomendado) **SOLO POR PRIMERA VEZ**

```bash
python -m venv venv
```

### 2. Activar entorno virtual, siga instrucciones para Windows (PowerShell), Windows(CMD), Linux/Mac **CADA VEZ SI SE CREÓ EL ENTORNO ANTES**

- Windows (PowerShell)
````
.\venv\Scripts\Activate
````
- Windows(CMD)
````
venv\Scripts\activate.bat
````
- Linux/Mac
````
source venv/bin/activate
````

### 3. Instalar dependencias **SOLO POR PRIMERA VEZ**

```bash
pip install -r requirements.txt
```

## Ejecución

Ejecute en la raíz del repositorio:

````
python -m backend.view
````

Luego acceda a `http://localhost:5000` en su navegador.

