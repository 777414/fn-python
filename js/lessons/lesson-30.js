/* Занятие 30. Поля ввода, получение данных и обработчики событий.
   Практический результат: графический калькулятор на CustomTkinter. */
window.LESSONS = window.LESSONS || {};
window.LESSONS['april-2'] = [
 {
  "kicker":"АПРЕЛЬ · ЗАНЯТИЕ 02",
  "title":"Научим окно реагировать на наши действия",
  "lead":"На прошлом занятии мы создали окно, надписи и кнопки. Сегодня добавим поля ввода и научим кнопки выполнять команды.",
  "note":"В конце соберём графический калькулятор с четырьмя арифметическими действиями."
 },
 {
  "kicker":"ВСПОМИНАЕМ",
  "title":"У нас уже есть окно и кнопка",
  "code":"import customtkinter as ctk\n\napp = ctk.CTk()\napp.geometry(\"400x300\")\n\nbutton = ctk.CTkButton(app, text=\"Нажми меня\")\nbutton.pack(pady=20)\n\napp.mainloop()",
  "reveals":[
   "Мы умеем создавать окно с помощью ctk.CTk().",
   "CTkButton создаёт кнопку, а pack() размещает её.",
   "Но пока кнопка ничего не делает."
  ]
 },
 {
  "kicker":"НОВАЯ ЗАДАЧА",
  "title":"Кнопка должна выполнять действие",
  "lead":"Представь кнопку «Показать приветствие». После нажатия в окне должно появиться сообщение.",
  "items":[
   {"title":"Пользователь","text":"Нажимает на кнопку."},
   {"title":"Программа","text":"Запускает нужную функцию."},
   {"title":"Окно","text":"Показывает новый результат."}
  ]
 },
 {
  "kicker":"НОВОЕ ПОНЯТИЕ",
  "title":"Что такое событие?",
  "lead":"Событие — это действие, которое происходит в приложении и на которое программа может отреагировать.",
  "items":[
   {"title":"Нажатие кнопки","text":"Пользователь нажал на элемент."},
   {"title":"Ввод текста","text":"Пользователь напечатал данные в поле."},
   {"title":"Закрытие окна","text":"Пользователь завершил работу с окном."}
  ]
 },
 {
  "kicker":"ОБРАБОТЧИК СОБЫТИЯ",
  "title":"Функция, которая реагирует на событие",
  "lead":"Обработчик события — функция, которую программа запускает в ответ на действие пользователя.",
  "code":"def say_hello():\n    print(\"Привет!\")",
  "reveals":[
   "Мы заранее создаём функцию say_hello().",
   "Она содержит действие, которое нужно выполнить.",
   "Осталось связать функцию с кнопкой."
  ]
 },
 {
  "kicker":"СВЯЗЫВАЕМ ФУНКЦИЮ И КНОПКУ",
  "title":"Параметр command",
  "code":"button = ctk.CTkButton(\n    app,\n    text=\"Поздороваться\",\n    command=say_hello\n)",
  "reveals":[
   "Параметр command сообщает кнопке, какую функцию запускать.",
   "Мы пишем say_hello без круглых скобок.",
   "Функция запустится только после нажатия кнопки."
  ],
  "note":"Не пиши command=say_hello() — так функция выполнится сразу при создании кнопки."
 },
 {
  "kicker":"ПРОВЕРЬ СЕБЯ",
  "title":"Когда запустится say_hello()?",
  "reveals":[
   "Не при создании кнопки.",
   "Функция запустится, когда пользователь нажмёт кнопку.",
   "За это отвечает параметр command."
  ]
 },
 {
  "kicker":"НОВЫЙ ВИДЖЕТ",
  "title":"Поле ввода CTkEntry",
  "lead":"CTkEntry — элемент, в который пользователь может напечатать текст или число.",
  "code":"name_entry = ctk.CTkEntry(app)\nname_entry.pack(pady=10)",
  "reveals":[
   "CTkEntry(app) создаёт поле внутри окна.",
   "pack() размещает поле.",
   "Теперь пользователь может вводить в него данные."
  ]
 },
 {
  "kicker":"ПОДСКАЗКА В ПОЛЕ",
  "title":"Параметр placeholder_text",
  "code":"name_entry = ctk.CTkEntry(\n    app,\n    placeholder_text=\"Введи своё имя\"\n)",
  "reveals":[
   "placeholder_text показывает подсказку, пока поле пустое.",
   "Подсказка исчезает, когда пользователь начинает вводить текст.",
   "Это помогает понять, какие данные нужны."
  ]
 },
 {
  "kicker":"ПОЛУЧАЕМ ДАННЫЕ",
  "title":"Метод get()",
  "lead":"Чтобы прочитать то, что пользователь ввёл в поле, используем метод get().",
  "code":"name = name_entry.get()\nprint(name)",
  "reveals":[
   "get() возвращает содержимое поля ввода.",
   "Результат сохраняем в переменную name.",
   "Важно: get() возвращает строку, даже если пользователь ввёл цифры."
  ]
 },
 {
  "kicker":"СВЯЗЫВАЕМ ВСЁ",
  "title":"Кнопка читает текст из поля",
  "code":"def show_name():\n    name = name_entry.get()\n    result_label.configure(text=\"Привет, \" + name)",
  "reveals":[
   "При нажатии функция получает текст через get().",
   "Затем формирует новое сообщение.",
   "Метод configure() позволяет изменить настройки уже созданного элемента."
  ]
 },
 {
  "kicker":"ИЗМЕНЯЕМ НАДПИСЬ",
  "title":"Метод configure()",
  "code":"result_label.configure(text=\"Добро пожаловать!\")",
  "reveals":[
   "Мы обращаемся к уже созданной надписи result_label.",
   "Параметр text задаёт новый текст.",
   "Так можно обновлять содержимое окна без создания новой надписи."
  ]
 },
 {
  "kicker":"ПОЛНЫЙ ПРИМЕР",
  "title":"Приложение, которое здоровается",
  "code":"import customtkinter as ctk\n\napp = ctk.CTk()\napp.title(\"Приветствие\")\napp.geometry(\"400x300\")\n\nname_entry = ctk.CTkEntry(app, placeholder_text=\"Твоё имя\")\nname_entry.pack(pady=15)\n\nresult_label = ctk.CTkLabel(app, text=\"Здесь будет приветствие\")\nresult_label.pack(pady=10)\n\ndef show_name():\n    name = name_entry.get()\n    result_label.configure(text=\"Привет, \" + name + \"!\")\n\nbutton = ctk.CTkButton(app, text=\"Поздороваться\", command=show_name)\nbutton.pack(pady=10)\n\napp.mainloop()",
  "reveals":[
   "Создаём поле ввода и надпись.",
   "Пишем функцию, которая получает имя и меняет текст надписи.",
   "Передаём функцию в параметр command кнопки.",
   "После запуска окна кнопка начинает реагировать на нажатие."
  ]
 },
 {
  "kicker":"ВАЖНОЕ ПРАВИЛО",
  "title":"Почему функция написана раньше кнопки?",
  "lead":"Когда Python создаёт кнопку, имя функции-обработчика уже должно быть ему известно.",
  "reveals":[
   "Сначала объявляем функцию show_name().",
   "Затем создаём кнопку и передаём ей имя этой функции.",
   "Так Python знает, какую функцию нужно вызвать при нажатии."
  ]
 },
 {
  "kicker":"СТРОКИ И ЧИСЛА",
  "title":"Поле ввода возвращает текст",
  "code":"number_text = number_entry.get()\nprint(type(number_text))",
  "reveals":[
   "Даже если пользователь ввёл 25, get() вернёт строку.",
   "Для математических вычислений строку нужно преобразовать в число.",
   "Например, можно использовать float() для целых и дробных чисел."
  ]
 },
 {
  "kicker":"ПРЕОБРАЗУЕМ ДАННЫЕ",
  "title":"Превращаем текст в число",
  "code":"number_text = number_entry.get()\nnumber = float(number_text)\nprint(number + 10)",
  "output":"35.0",
  "reveals":[
   "get() получает строку из поля.",
   "float() преобразует строку в число с возможной дробной частью.",
   "Теперь можно выполнять математические действия."
  ]
 },
 {
  "kicker":"ВОЗМОЖНАЯ ПРОБЛЕМА",
  "title":"Что, если пользователь ввёл не число?",
  "code":"number = float(number_entry.get())",
  "reveals":[
   "Если поле пустое или в нём написано слово, преобразование не получится.",
   "Python сообщит об ошибке ValueError.",
   "Нужно предусмотреть такую ситуацию, чтобы приложение не завершалось неожиданно."
  ]
 },
 {
  "kicker":"ОБРАБОТКА ОШИБКИ",
  "title":"Используем try и except",
  "code":"try:\n    number = float(number_entry.get())\n    result_label.configure(text=str(number * 2))\nexcept ValueError:\n    result_label.configure(text=\"Введи число\")",
  "reveals":[
   "В блоке try размещаем преобразование и вычисление.",
   "Если преобразование не удалось, выполняется блок except.",
   "Вместо аварийного завершения пользователь увидит понятную подсказку."
  ]
 },
 {
  "kicker":"ПЛАН ПРОЕКТА",
  "title":"Создаём графический калькулятор",
  "lead":"Калькулятор будет получать два числа из полей ввода и выполнять выбранное действие.",
  "list":[
   "Создать окно и заголовок.",
   "Добавить два поля для чисел.",
   "Добавить надпись для результата.",
   "Создать функции для четырёх действий.",
   "Добавить кнопки и связать их с функциями."
  ]
 },
 {
  "kicker":"ГОТОВИМ ОКНО",
  "title":"Два поля и надпись результата",
  "code":"first_entry = ctk.CTkEntry(app, placeholder_text=\"Первое число\")\nfirst_entry.pack(pady=8)\n\nsecond_entry = ctk.CTkEntry(app, placeholder_text=\"Второе число\")\nsecond_entry.pack(pady=8)\n\nresult_label = ctk.CTkLabel(app, text=\"Результат появится здесь\")\nresult_label.pack(pady=15)",
  "reveals":[
   "Первое поле хранит первое число.",
   "Второе поле хранит второе число.",
   "Надпись result_label будет показывать ответ или сообщение об ошибке."
  ]
 },
 {
  "kicker":"ЧИТАЕМ ДВА ЧИСЛА",
  "title":"Получаем значения из обоих полей",
  "code":"first_text = first_entry.get()\nsecond_text = second_entry.get()\n\nfirst_number = float(first_text)\nsecond_number = float(second_text)",
  "reveals":[
   "Каждое поле имеет свой метод get().",
   "Оба значения сначала приходят как строки.",
   "Преобразуем их в числа с помощью float()."
  ]
 },
 {
  "kicker":"ФУНКЦИЯ СЛОЖЕНИЯ",
  "title":"Первое действие — сложение",
  "code":"def add_numbers():\n    try:\n        a = float(first_entry.get())\n        b = float(second_entry.get())\n        result = a + b\n        result_label.configure(text=str(result))\n    except ValueError:\n        result_label.configure(text=\"Проверь введённые числа\")",
  "reveals":[
   "Функция получает данные из обоих полей.",
   "Затем складывает числа и обновляет надпись.",
   "Если введено что-то неподходящее, показываем сообщение."
  ]
 },
 {
  "kicker":"ЕЩЁ ТРИ ДЕЙСТВИЯ",
  "title":"Вычитание, умножение и деление",
  "code":"def subtract_numbers():\n    calculate_result(\"subtract\")\n\ndef multiply_numbers():\n    calculate_result(\"multiply\")\n\ndef divide_numbers():\n    calculate_result(\"divide\")",
  "reveals":[
   "Для каждого действия создаём отдельную функцию-обработчик.",
   "Все три функции вызывают общую calculate_result().",
   "Так повторяющуюся часть вычислений можно хранить в одном месте."
  ]
 },
 {
  "kicker":"ОБЩАЯ ФУНКЦИЯ",
  "title":"Не повторяем одинаковый код",
  "code":"def calculate_result(operation):\n    try:\n        a = float(first_entry.get())\n        b = float(second_entry.get())\n\n        if operation == \"add\":\n            result = a + b\n        elif operation == \"subtract\":\n            result = a - b\n        elif operation == \"multiply\":\n            result = a * b\n        elif operation == \"divide\":\n            if b == 0:\n                result_label.configure(text=\"На ноль делить нельзя\")\n                return\n            result = a / b\n\n        result_label.configure(text=\"Результат: \" + str(result))\n    except ValueError:\n        result_label.configure(text=\"Введи два числа\")",
  "reveals":[
   "Параметр operation сообщает, какое действие нужно выполнить.",
   "Условия выбирают нужную математическую операцию.",
   "Перед делением проверяем, что второе число не равно нулю.",
   "Если данные некорректны, except показывает подсказку."
  ]
 },
 {
  "kicker":"СОЗДАЁМ КНОПКИ",
  "title":"Связываем кнопки с обработчиками",
  "code":"add_button = ctk.CTkButton(app, text=\"+ Сложить\", command=add_numbers)\nadd_button.pack(pady=5)\n\nsubtract_button = ctk.CTkButton(app, text=\"− Вычесть\", command=subtract_numbers)\nsubtract_button.pack(pady=5)\n\nmultiply_button = ctk.CTkButton(app, text=\"× Умножить\", command=multiply_numbers)\nmultiply_button.pack(pady=5)\n\ndivide_button = ctk.CTkButton(app, text=\"÷ Разделить\", command=divide_numbers)\ndivide_button.pack(pady=5)",
  "reveals":[
   "У каждой кнопки свой текст и свой обработчик.",
   "command получает имя функции без скобок.",
   "После нажатия запускается соответствующее действие."
  ]
 },
{
 "kicker": "ПОЛНАЯ ПРОГРАММА",
 "title": "Графический калькулятор целиком",
 "code": "import customtkinter as ctk\n\napp = ctk.CTk()\napp.title(\"Калькулятор\")\napp.geometry(\"420x520\")\n\nfirst_entry = ctk.CTkEntry(app, placeholder_text=\"Первое число\")\nfirst_entry.pack(pady=8)\nsecond_entry = ctk.CTkEntry(app, placeholder_text=\"Второе число\")\nsecond_entry.pack(pady=8)\nresult_label = ctk.CTkLabel(app, text=\"Результат появится здесь\")\nresult_label.pack(pady=15)\n\ndef calculate_result(operation):\n    try:\n        a = float(first_entry.get())\n        b = float(second_entry.get())\n        if operation == \"add\":\n            result = a + b\n        elif operation == \"subtract\":\n            result = a - b\n        elif operation == \"multiply\":\n            result = a * b\n        elif operation == \"divide\":\n            if b == 0:\n                result_label.configure(text=\"На ноль делить нельзя\")\n                return\n            result = a / b\n        result_label.configure(text=\"Результат: \" + str(result))\n    except ValueError:\n        result_label.configure(text=\"Введи два числа\")\n\ndef add_numbers():\n    calculate_result(\"add\")\n\ndef subtract_numbers():\n    calculate_result(\"subtract\")\n\ndef multiply_numbers():\n    calculate_result(\"multiply\")\n\ndef divide_numbers():\n    calculate_result(\"divide\")\n\nctk.CTkButton(app, text=\"+ Сложить\", command=add_numbers).pack(pady=5)\nctk.CTkButton(app, text=\"− Вычесть\", command=subtract_numbers).pack(pady=5)\nctk.CTkButton(app, text=\"× Умножить\", command=multiply_numbers).pack(pady=5)\nctk.CTkButton(app, text=\"÷ Разделить\", command=divide_numbers).pack(pady=5)\n\napp.mainloop()",
 "reveals": [
  "Сначала создаём окно, поля ввода и надпись результата.",
  "Функция calculate_result() получает числа, выбирает действие и обрабатывает ошибки.",
  "Четыре небольшие функции передают в неё нужную операцию.",
  "Кнопки связываются с обработчиками через command.",
  "В конце mainloop() запускает окно."
 ]
},
 {
  "kicker":"СОБИРАЕМ ЛОГИКУ",
  "title":"Как связаны элементы калькулятора?",
  "items":[
   {"title":"Поля ввода","text":"Хранят введённые пользователем значения."},
   {"title":"Кнопка","text":"Запускает функцию-обработчик."},
   {"title":"Функция","text":"Получает данные, проверяет их и выполняет вычисление."},
   {"title":"Надпись","text":"Показывает результат или сообщение об ошибке."}
  ]
 },
 {
  "kicker":"ПРОВЕРЯЕМ КАЛЬКУЛЯТОР",
  "title":"Какие ситуации нужно проверить?",
  "items":[
   {"title":"Обычные числа","text":"Например, 12 и 3."},
   {"title":"Дробные числа","text":"Например, 2.5 и 1.5."},
   {"title":"Пустое поле или текст","text":"Должна появиться подсказка."},
   {"title":"Деление на ноль","text":"Программа должна сообщить, что так делать нельзя."}
  ],
  "note":"Для ввода дробных чисел в этом примере используется точка: 2.5."
 },
 {
  "kicker":"ПРАКТИКА · БАЗОВЫЙ УРОВЕНЬ",
  "title":"Собери простой калькулятор",
  "list":[
   "Создай окно и два поля ввода.",
   "Добавь кнопку сложения.",
   "Получай значения через get() и преобразуй их в float().",
   "Показывай ответ в CTkLabel через configure()."
  ]
 },
 {
  "kicker":"ПРАКТИКА · УЛУЧШЕННЫЙ УРОВЕНЬ",
  "title":"Добавь остальные действия",
  "list":[
   "Добавь кнопки вычитания, умножения и деления.",
   "Обработай ValueError с помощью try и except.",
   "Добавь отдельную проверку деления на ноль.",
   "Сделай подписи и отступы более аккуратными."
  ]
 },
 {
  "kicker":"ПРАКТИКА · ТВОРЧЕСКИЙ УРОВЕНЬ",
  "title":"Преврати калькулятор в полезный инструмент",
  "list":[
   "Добавь кнопку очистки полей.",
   "Показывай выражение целиком, например 12 + 3 = 15.",
   "Добавь вычисление процента или возведение в степень.",
   "Придумай собственную цветовую тему и название."
  ]
 },
 {
  "kicker":"ПАМЯТКА",
  "title":"Как сделать интерфейс интерактивным?",
  "list":[
   "CTkEntry() создаёт поле ввода.",
   "get() получает введённый текст.",
   "command связывает кнопку с функцией.",
   "Функция-обработчик выполняет действие после нажатия.",
   "configure() изменяет уже созданный элемент.",
   "try и except помогают обработать неподходящий ввод."
  ]
 },
 {
  "kicker":"ИТОГИ ЗАНЯТИЯ",
  "title":"Теперь наши окна умеют реагировать",
  "list":[
   "Мы добавили поля ввода CTkEntry.",
   "Научились получать данные через get().",
   "Связали кнопки с функциями через command.",
   "Научились обновлять надписи с помощью configure().",
   "Создали графический калькулятор с проверкой ввода."
  ]
 },
 {
  "kicker":"ФИНАЛЬНЫЙ ВОПРОС",
  "title":"Как заставить кнопку выполнить нужное действие?",
  "lead":"Представь, что в приложении есть поле ввода и кнопка «Проверить». Что нужно подготовить, чтобы после нажатия программа обработала введённый текст?",
  "reveals":[
   "Создать функцию, которая получает данные из поля через get().",
   "Передать имя этой функции в параметр command кнопки.",
   "Внутри функции обработать данные и обновить элементы интерфейса."
  ],
  "note":"На следующем занятии создадим графическую викторину с вопросами, вариантами ответов и подсчётом баллов."
 }
];
