from flask import Flask, render_template, request, redirect, url_for, send_from_directory
import os

base_dir = os.path.dirname(os.path.abspath(__file__))
template_dir = os.path.join(base_dir, '../frontend')
static_dir = os.path.join(base_dir, '../disenno')
media_dir = os.path.join(base_dir, '../media')

app = Flask(__name__,
            template_folder=template_dir,
            static_folder=static_dir)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Handle form submission or other POST requests here
        return redirect(url_for('index'))
    return render_template('landing.html')

# Servir archivos de media
@app.route('/media/<path:filename>')
def media(filename):
    return send_from_directory(media_dir, filename)

@app.errorhandler(404)
def not_found(error):
    return redirect(url_for('index')), 302

@app.errorhandler(500)
def internal_error(error):
    return "Error interno del servidor", 500

if __name__ == '__main__':
    app.run(debug=True)