<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Pagamento Vortex</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            color: #fff;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background: rgba(0, 0, 0, 0.8);
            border-radius: 15px;
            padding: 80px;
            width: 45%;
            max-width: 800px;
            text-align: center;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
        }
        .logo {
            max-width: 100px;
        }
        h1 {
            margin: 1px 0 10px;
        }
        label {
            display: block;
            margin: 10px 0 5px;
        }
        input, select, button {
            width: 80%;
            padding: 10px;
            margin-bottom: 15px;
            border: none;
            border-radius: 5px;
        }
        button {
            background: linear-gradient(135deg, #ff7e5f, #feb47b);
            color: white;
            cursor: pointer;
            transition: background 0.3s;
        }
        button:hover {
            background: linear-gradient(135deg, #feb47b, #ff7e5f);
        }
        .output {
            margin-top: 15px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            text-align: left;
        }
        .hidden {
            display: none;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        table th, table td {
            border: 0.1px solid #fff;
            padding: 4px;
            text-align: center;
        }
        table th {
            background: rgba(255, 255, 255, 0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://i.ibb.co/kc3Fkd9/image-removebg-preview-60.png" alt="Logo" class="logo">
        <h1>Calculadora de Pagamento Vortex</h1>

        <label for="segment">Escolha o segmento:</label>
        <select id="segment" onchange="handleSegmentChange()">
            <option value="">Selecione...</option>
            <option value="streamer">Streamer</option>
            <option value="jornal">Jornal</option>
        </select>

        <div id="streamer-options" class="hidden">
            <label for="start-time">Horário Inicial da Live:</label>
            <input type="time" id="start-time">

            <label for="end-time">Horário Final da Live:</label>
            <input type="time" id="end-time">

            <button onclick="calculateStreamer()">Calcular</button>
            <button onclick="clearInputs()">Limpar</button>
            <div id="streamer-output" class="output hidden"></div>
        </div>

        <div id="jornal-options" class="hidden">
            <table>
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                    </tr>
                </thead>
               
                <tbody id="jornal-table">
                    <tr>
                        <td>Publicação na cidade</td>
                        <td>190000</td>
                        <td><input type="number" min="0" onchange="updateTotal(this, 190000)"></td>
                        <td class="total">0</td>
                    </tr>
                    <tr>
                        <td>Cobertura das Ações</td>
                        <td>450000</td>
                        <td><input type="number" min="0" onchange="updateTotal(this, 450000)"></td>
                        <td class="total">0</td>
                    </tr>
                    <tr>
                        <td>Podcast</td>
                        <td>570000</td>
                        <td><input type="number" min="0" onchange="updateTotal(this, 570000)"></td>
                        <td class="total">0</td>
                    </tr>
                    <tr>
                        <td>Entrevista</td>
                        <td>170000</td>
                        <td><input type="number" min="0" onchange="updateTotal(this, 170000)"></td>
                        <td class="total">0</td>
                    </tr>
                    <tr>
                        <td>Recrutamento</td>
                        <td>100000</td>
                        <td><input type="number" min="0" onchange="updateTotal(this, 100000)"></td>
                        <td class="total">0</td>
                    </tr>
                    <tr>
                        <td>Anuncio de emprego</td>
                        <td>25000</td>
                        <td><input type="number" min="0" onchange="updateTotal(this, 25000)"></td>
                        <td class="total">0</td>
                    </tr>
                    <tr>
                        <td>Publicação fofoca no DC</td>
                        <td>190000</td>
                        <td><input type="number" min="0" onchange="updateTotal(this, 190000)"></td>
                        <td class="total">0</td>
                    </tr>
                    <tr>
                        <td>Bonus semanal</td>
                        <td>1500000</td>
                        <td><input type="number" min="0" onchange="updateTotal(this, 1500000)"></td>
                        <td class="total">0</td>
                    </tr>
                </tbody>
            </table>
            <button onclick="calculateJornalTotal()">Calcular Resumo</button>
            <button onclick="clearInputs()">Limpar</button>
            <div id="jornal-summary" class="output hidden"></div>
        </div>
    </div>

    <script>
        function handleSegmentChange() {
            const segment = document.getElementById('segment').value;
            document.getElementById('streamer-options').classList.add('hidden');
            document.getElementById('jornal-options').classList.add('hidden');

            if (segment === 'streamer') {
                document.getElementById('streamer-options').classList.remove('hidden');
            } else if (segment === 'jornal') {
                document.getElementById('jornal-options').classList.remove('hidden');
            }
        }

        function calculateStreamer() {
            const startTime = document.getElementById('start-time').value;
            const endTime = document.getElementById('end-time').value;

            if (!startTime || !endTime) {
                alert('Por favor, insira os horários.');
                return;
            }

            const start = new Date(`1970-01-01T${startTime}Z`);
            const end = new Date(`1970-01-01T${endTime}Z`);
            const diff = (end - start) / 1000;
            if (diff < 0) {
                alert('O horário final deve ser após o horário inicial.');
                return;
            }

            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;

            let payment;
            if (hours >= 2 && hours <= 4) {
                payment = 1500000;
            } else if (hours >= 4.5 && hours <= 6) {
                payment = 2500000;
            } else if (hours > 6) {
                payment = 2500000 + (hours - 6) * 200000;
            } else {
                payment = 0;
            }

            document.getElementById('streamer-output').classList.remove('hidden');
            document.getElementById('streamer-output').innerHTML = `Tempo de Live: ${hours}h ${minutes}m ${seconds}s<br>Pagamento: R$ ${payment.toLocaleString()}`;
        }

        function updateTotal(input, value) {
            const quantity = parseInt(input.value) || 0;
            const total = quantity * value;
            input.parentElement.nextElementSibling.textContent = total.toLocaleString();
        }

        function calculateJornalTotal() {
            const totals = document.querySelectorAll('.total');
            let sum = 0;
            totals.forEach(td => {
                sum += parseInt(td.textContent.replace(/\D/g, '')) || 0;
            });

            document.getElementById('jornal-summary').classList.remove('hidden');
            document.getElementById('jornal-summary').innerHTML = `Resumo Total: R$ ${sum.toLocaleString()}`;
        }

        function clearInputs() {
            document.querySelectorAll('input').forEach(input => input.value = '');
            document.querySelectorAll('.total').forEach(td => td.textContent = '0');
            document.getElementById('streamer-output').classList.add('hidden');
            document.getElementById('jornal-summary').classList.add('hidden');
        }
    </script>
</body>
</html>
