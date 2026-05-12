from flask import Flask, render_template, request, session, redirect, url_for

app = Flask(__name__)
app.secret_key = 'mi_secreto'

@app.route('/', methods=['GET', 'POST'])
def index():
    if 'nivel' not in session:
        session['nivel'] = 1

    error = None
    
    if request.method == 'POST':
        nivel = session['nivel']
        
        # Nivel 1: Reglas (2 preguntas)
        if nivel == 1:
            r1 = request.form.get('r1')
            r2 = request.form.get('r2')
            if r1 == '10' and r2 == '80':
                session['nivel'] = 2
            else:
                error = "revisa el reglamento, las respuestas no son correctas."

        # Nivel 2: Notas (2 preguntas)
        elif nivel == 2:
            r3 = request.form.get('r3')
            r4 = request.form.get('r4')
            if r3 == '40' and r4 == '10':
                session['nivel'] = 3
            else:
                error = "los porcentajes de evaluación están mal."

        # Nivel 3: Skills (2 preguntas)
        elif nivel == 3:
            r5 = request.form.get('r5')
            r6 = request.form.get('r6')
            if r5 == 'u2' and r6 == 'despliegue':
                session['nivel'] = 4
            else:
                error = "debes conocer mejor las unidades de la materia."

    return render_template('index.html', error=error)

@app.route('/reiniciar')
def reiniciar():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
