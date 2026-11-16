/* Занятие 32. Soundboard Studio: проект и окно приложения. */
window.LESSONS = window.LESSONS || {};
window.LESSONS['may-1'] = [
 {
  "kicker": "МАЙ · ЗАНЯТИЕ 01",
  "title": "Знакомимся с Soundboard Studio",
  "lead": "Начинаем итоговый проект курса. Сегодня подготовим папки, файлы и окно приложения. Звуки пока не воспроизводим: сначала создадим основу, к которой будем подключать новые возможности.",
  "note": "Результат: окно с заголовком, областью звуковой коллекции и панелью управления."
 },
 {
  "kicker": "ИТОГОВЫЙ ПРОЕКТ",
  "title": "Что будет уметь Soundboard Studio?",
  "items": [
   {
    "title": "Импортировать WAV",
    "text": "Добавлять звуковые файлы с компьютера."
   },
   {
    "title": "Воспроизводить и останавливать",
    "text": "Запускать выбранный звук из карточки."
   },
   {
    "title": "Записывать звуки",
    "text": "Записывать фрагмент до пяти секунд и прослушивать его."
   },
   {
    "title": "Управлять коллекцией",
    "text": "Давать звукам названия, переименовывать и удалять их."
   },
   {
    "title": "Сохранять коллекцию",
    "text": "Запоминать список звуков в JSON и загружать его при запуске."
   }
  ]
 },
 {
  "kicker": "АРХИТЕКТУРА",
  "title": "Не будем писать всё в одном файле",
  "lead": "Разделим программу на части. Каждая будет отвечать за свою задачу.",
  "items": [
   {
    "title": "main.py",
    "text": "Точка входа: собирает приложение и запускает окно."
   },
   {
    "title": "interface/",
    "text": "Файлы оконного интерфейса."
   },
   {
    "title": "recorder.py",
    "text": "Запись и предварительное прослушивание."
   },
   {
    "title": "storage.py",
    "text": "Загрузка и сохранение коллекции."
   }
  ]
 },
 {
  "kicker": "ПЛАН",
  "title": "Что сделаем сегодня?",
  "list": [
   "Создадим папку SoundboardStudio.",
   "Установим библиотеки из requirements.txt.",
   "Создадим папку interface и файлы интерфейса.",
   "Соберём окно на CustomTkinter.",
   "Добавим заголовок, область коллекции и панель управления.",
   "Запустим и проверим приложение."
  ]
 },
 {
  "kicker": "ВАЖНОЕ ПРАВИЛО",
  "title": "При первом запуске коллекция пустая",
  "lead": "В проекте не будет встроенных звуков и заранее созданных категорий. Пользователь сам наполнит свою коллекцию.",
  "note": "Сегодня покажем сообщение «Коллекция пока пуста». Это правильное начальное состояние."
 },
 {
  "kicker": "ПАПКА ПРОЕКТА",
  "title": "Создаём SoundboardStudio",
  "lead": "Создай папку с точным названием SoundboardStudio и открой её в редакторе кода.",
  "code": "SoundboardStudio/",
  "reveals": [
   "Название пишем слитно, без пробелов.",
   "Все файлы проекта будут внутри этой папки.",
   "Терминал для запуска программы тоже откроем здесь."
  ]
 },
 {
  "kicker": "БИБЛИОТЕКИ",
  "title": "Какие инструменты понадобятся?",
  "items": [
   {
    "title": "customtkinter",
    "text": "Современное графическое окно и элементы интерфейса."
   },
   {
    "title": "sounddevice",
    "text": "Запись и воспроизведение звука на следующих занятиях."
   },
   {
    "title": "soundfile",
    "text": "Чтение и сохранение WAV-файлов на следующих занятиях."
   }
  ]
 },
 {
  "kicker": "REQUIREMENTS.TXT",
  "title": "Составляем список библиотек",
  "lead": "В корне проекта создай файл requirements.txt. Каждую библиотеку запиши с новой строки.",
  "code": "customtkinter\nsounddevice\nsoundfile",
  "reveals": [
   "Этот файл хранит список зависимостей проекта.",
   "Сегодня используем CustomTkinter.",
   "Аудиобиблиотеки понадобятся в следующих занятиях."
  ]
 },
 {
  "kicker": "УСТАНОВКА",
  "title": "Устанавливаем все библиотеки",
  "lead": "Открой терминал в папке SoundboardStudio и выполни:",
  "code": "py -m pip install -r requirements.txt",
  "reveals": [
   "py запускает Python.",
   "-m pip запускает установщик библиотек.",
   "-r означает, что список нужно прочитать из requirements.txt.",
   "Если команда py не работает, преподаватель поможет выбрать команду для компьютера."
  ]
 },
 {
  "kicker": "СТРУКТУРА ПРОЕКТА",
  "title": "К чему мы придём в конце проекта?",
  "code": "SoundboardStudio/\n  main.py\n  storage.py\n  recorder.py\n  requirements.txt\n  README.md\n  interface/\n    __init__.py\n    window.py\n    header.py\n    sound_panel.py\n    controls.py\n  sounds/\n    custom/\n  data/\n    sounds.json",
  "reveals": [
   "main.py запускает приложение.",
   "interface/ содержит части интерфейса.",
   "recorder.py и storage.py добавим, когда займёмся записью и сохранением.",
   "sounds/custom/ будет хранить WAV-файлы пользователя.",
   "sounds.json появится при первом сохранении коллекции."
  ]
 },
 {
  "kicker": "РАБОТАЕМ ПОЭТАПНО",
  "title": "Сегодня создаём только нужные файлы",
  "items": [
   {
    "title": "Создаём сейчас",
    "text": "main.py, requirements.txt и папку interface с четырьмя файлами."
   },
   {
    "title": "Добавим позже",
    "text": "recorder.py, storage.py, sounds/custom и data."
   },
   {
    "title": "Не создаём заранее пустой JSON",
    "text": "Файл sounds.json появится при первом сохранении коллекции."
   }
  ]
 },
 {
  "kicker": "ПАПКА INTERFACE",
  "title": "Создаём папку интерфейса",
  "lead": "Внутри SoundboardStudio создай папку interface. В ней будут функции для отдельных областей окна.",
  "code": "SoundboardStudio/\n└── interface/"
 },
 {
  "kicker": "INIT.PY",
  "title": "Добавляем файл __init__.py",
  "lead": "Создай внутри interface пустой файл __init__.py. Он обозначает папку как пакет Python.",
  "code": "interface/\n└── __init__.py",
  "reveals": [
   "По два символа подчёркивания с каждой стороны слова init.",
   "Файл на этом этапе остаётся пустым."
  ]
 },
 {
  "kicker": "ТОЧКА ВХОДА",
  "title": "Файл main.py будет очень коротким",
  "lead": "В корне проекта создай main.py. Он импортирует функцию создания окна, вызывает её и запускает приложение.",
  "code": "from interface.window import create_window\n\napp = create_window()\napp.mainloop()\n",
  "reveals": [
   "Сохрани код именно в SoundboardStudio/main.py.",
   "from ... import подключает функцию из другого файла.",
   "mainloop() запускает обработку действий окна.",
   "Интерфейс не пишем в main.py."
  ]
 },
 {
  "kicker": "ОКНО ПРИЛОЖЕНИЯ",
  "title": "Создаём interface/window.py",
  "lead": "Этот файл отвечает за создание и настройку главного окна. Он также соединит три части интерфейса.",
  "code": "interface/window.py"
 },
 {
  "kicker": "ИМПОРТЫ",
  "title": "Подключаем библиотеку и функции интерфейса",
  "code": "import customtkinter as ctk\n\nfrom interface.header import create_header\nfrom interface.sound_panel import create_sound_panel\nfrom interface.controls import create_controls",
  "reveals": [
   "customtkinter подключаем под коротким именем ctk.",
   "Остальные строки импортируют наши функции из соседних файлов.",
   "Эти файлы создадим на следующих шагах."
  ]
 },
 {
  "kicker": "ФУНКЦИЯ ОКНА",
  "title": "Настраиваем главное окно",
  "code": "def create_window():\n    ctk.set_appearance_mode(\\\"dark\\\")\n    ctk.set_default_color_theme(\\\"blue\\\")\n\n    app = ctk.CTk()\n    app.title(\\\"Soundboard Studio\\\")\n    app.geometry(\\\"760x560\\\")\n    app.minsize(620, 460)",
  "reveals": [
   "dark включает тёмную тему.",
   "blue выбирает синюю цветовую палитру.",
   "CTk() создаёт окно.",
   "title() задаёт заголовок окна.",
   "geometry() задаёт размер, minsize() — минимальный размер."
  ]
 },
 {
  "kicker": "СОБИРАЕМ ЧАСТИ",
  "title": "Добавляем области и возвращаем окно",
  "code": "    create_header(app)\n    create_sound_panel(app)\n    create_controls(app)\n\n    return app",
  "reveals": [
   "Каждая функция создаёт одну часть интерфейса.",
   "app передаём как родительское окно.",
   "return app возвращает окно в main.py."
  ]
 },
 {
  "kicker": "ПОЛНЫЙ ФАЙЛ",
  "title": "Сохрани полный interface/window.py",
  "code": "import customtkinter as ctk\n\nfrom interface.header import create_header\nfrom interface.sound_panel import create_sound_panel\nfrom interface.controls import create_controls\n\n\ndef create_window():\n    ctk.set_appearance_mode(\"dark\")\n    ctk.set_default_color_theme(\"blue\")\n\n    app = ctk.CTk()\n    app.title(\"Soundboard Studio\")\n    app.geometry(\"760x560\")\n    app.minsize(620, 460)\n\n    create_header(app)\n    create_sound_panel(app)\n    create_controls(app)\n\n    return app\n",
  "reveals": [
   "Этот код должен целиком находиться в interface/window.py.",
   "Проверь отступы внутри create_window().",
   "Остальные три файла интерфейса создадим далее."
  ]
 },
 {
  "kicker": "ЗАГОЛОВОК",
  "title": "Создаём interface/header.py",
  "lead": "В этом файле будет верхняя часть окна: название приложения и строка состояния.",
  "code": "interface/header.py"
 },
 {
  "kicker": "ФУНКЦИЯ ЗАГОЛОВКА",
  "title": "Создаём рамку и название",
  "code": "import customtkinter as ctk\n\n\ndef create_header(parent):\n    header = ctk.CTkFrame(parent, corner_radius=16)\n    header.pack(fill=\\\"x\\\", padx=24, pady=(24, 12))\n\n    title = ctk.CTkLabel(\n        header,\n        text=\\\"Soundboard Studio\\\",\n        font=(\\\"Arial\\\", 28, \\\"bold\\\")\n    )\n    title.pack(anchor=\\\"w\\\", padx=20, pady=(16, 4))",
  "reveals": [
   "CTkFrame создаёт контейнер.",
   "CTkLabel показывает текст.",
   "parent — окно, в которое добавляется заголовок.",
   "pack() размещает элементы."
  ]
 },
 {
  "kicker": "СТРОКА СОСТОЯНИЯ",
  "title": "Добавляем приветствие",
  "code": "    status = ctk.CTkLabel(\n        header,\n        text=\\\"Добро пожаловать! Здесь появится статус приложения.\\\",\n        anchor=\\\"w\\\"\n    )\n    status.pack(fill=\\\"x\\\", padx=20, pady=(0, 16))",
  "reveals": [
   "Строка состояния будет показывать сообщения приложения.",
   "Позже её текст будем менять после действий пользователя."
  ]
 },
 {
  "kicker": "ПОЛНЫЙ ФАЙЛ",
  "title": "Сохрани полный interface/header.py",
  "code": "import customtkinter as ctk\n\n\ndef create_header(parent):\n    header = ctk.CTkFrame(parent, corner_radius=16)\n    header.pack(fill=\"x\", padx=24, pady=(24, 12))\n\n    title = ctk.CTkLabel(\n        header,\n        text=\"Soundboard Studio\",\n        font=(\"Arial\", 28, \"bold\")\n    )\n    title.pack(anchor=\"w\", padx=20, pady=(16, 4))\n\n    status = ctk.CTkLabel(\n        header,\n        text=\"Добро пожаловать! Здесь появится статус приложения.\",\n        anchor=\"w\"\n    )\n    status.pack(fill=\"x\", padx=20, pady=(0, 16))\n",
  "reveals": [
   "Сохрани весь код в interface/header.py.",
   "Не добавляй этот код в main.py или window.py."
  ]
 },
 {
  "kicker": "ОБЛАСТЬ КОЛЛЕКЦИИ",
  "title": "Создаём interface/sound_panel.py",
  "lead": "Здесь будут располагаться карточки звуков. Пока коллекция пустая, поэтому покажем заголовок и поясняющее сообщение.",
  "code": "interface/sound_panel.py"
 },
 {
  "kicker": "ПУСТАЯ ПАНЕЛЬ",
  "title": "Создаём область и сообщение",
  "code": "import customtkinter as ctk\n\n\ndef create_sound_panel(parent):\n    panel = ctk.CTkFrame(parent, corner_radius=16)\n    panel.pack(fill=\\\"both\\\", expand=True, padx=24, pady=12)\n\n    heading = ctk.CTkLabel(\n        panel,\n        text=\\\"Моя звуковая коллекция\\\",\n        font=(\\\"Arial\\\", 20, \\\"bold\\\")\n    )\n    heading.pack(anchor=\\\"w\\\", padx=20, pady=(18, 8))\n\n    empty_message = ctk.CTkLabel(\n        panel,\n        text=\\\"Коллекция пока пуста. Позже здесь появятся карточки звуков.\\\"\n    )\n    empty_message.pack(anchor=\\\"w\\\", padx=20, pady=(0, 18))",
  "reveals": [
   "CTkFrame создаёт область будущих карточек.",
   "fill=both и expand=True позволяют панели занять свободное место.",
   "Пустая коллекция — ожидаемое начальное состояние."
  ]
 },
 {
  "kicker": "ПОЛНЫЙ ФАЙЛ",
  "title": "Сохрани полный interface/sound_panel.py",
  "code": "import customtkinter as ctk\n\n\ndef create_sound_panel(parent):\n    panel = ctk.CTkFrame(parent, corner_radius=16)\n    panel.pack(fill=\"both\", expand=True, padx=24, pady=12)\n\n    heading = ctk.CTkLabel(\n        panel,\n        text=\"Моя звуковая коллекция\",\n        font=(\"Arial\", 20, \"bold\")\n    )\n    heading.pack(anchor=\"w\", padx=20, pady=(18, 8))\n\n    empty_message = ctk.CTkLabel(\n        panel,\n        text=\"Коллекция пока пуста. Позже здесь появятся карточки звуков.\"\n    )\n    empty_message.pack(anchor=\"w\", padx=20, pady=(0, 18))\n",
  "reveals": [
   "Сохрани код в interface/sound_panel.py.",
   "Кнопок воспроизведения пока нет — добавим их на следующем занятии."
  ]
 },
 {
  "kicker": "ПАНЕЛЬ УПРАВЛЕНИЯ",
  "title": "Создаём interface/controls.py",
  "lead": "Здесь будут кнопки импорта и управления звуками. Пока оставим понятную надпись-заглушку.",
  "code": "interface/controls.py"
 },
 {
  "kicker": "НИЖНЯЯ ОБЛАСТЬ",
  "title": "Добавляем рамку и пояснение",
  "code": "import customtkinter as ctk\n\n\ndef create_controls(parent):\n    controls = ctk.CTkFrame(parent, corner_radius=16)\n    controls.pack(fill=\"x\", padx=24, pady=(0, 24))\n\n    hint = ctk.CTkLabel(\n        controls,\n        text=\"Здесь будут кнопки импорта и управления звуками.\"\n    )\n    hint.pack(anchor=\"w\", padx=20, pady=16)\n",
  "reveals": [
   "Создаём рамку для будущих кнопок.",
   "Пока внутри только поясняющая надпись.",
   "Импорт WAV и другие действия добавим позже."
  ]
 },
 {
  "kicker": "ПРОВЕРЯЕМ СТРУКТУРУ",
  "title": "Все файлы должны лежать на своих местах",
  "code": "SoundboardStudio/\n├── main.py\n├── requirements.txt\n└── interface/\n    ├── __init__.py\n    ├── window.py\n    ├── header.py\n    ├── sound_panel.py\n    └── controls.py",
  "reveals": [
   "main.py и requirements.txt лежат в корне.",
   "Все четыре файла интерфейса лежат внутри interface/.",
   "Не создавай window.py или header.py рядом с main.py."
  ]
 },
 {
  "kicker": "ЗАПУСК",
  "title": "Запускаем Soundboard Studio",
  "lead": "Открой терминал в папке SoundboardStudio и выполни:",
  "code": "py main.py",
  "reveals": [
   "Python запускает main.py.",
   "main.py импортирует create_window().",
   "Окно собирается из трёх отдельных частей.",
   "Если окно появилось, основа приложения работает."
  ]
 },
 {
  "kicker": "ПРОВЕРКА",
  "title": "Что должно быть в окне?",
  "items": [
   {
    "title": "Сверху",
    "text": "Название Soundboard Studio и приветственный статус."
   },
   {
    "title": "В центре",
    "text": "Заголовок «Моя звуковая коллекция» и сообщение, что коллекция пуста."
   },
   {
    "title": "Снизу",
    "text": "Панель с местом для будущих кнопок импорта и управления."
   }
  ],
  "note": "Звуки пока не импортируются и не воспроизводятся. Это будет темой следующего занятия."
 },
 {
  "kicker": "ПОИСК ОШИБОК",
  "title": "Если окно не открылось",
  "items": [
   {
    "title": "No module named customtkinter",
    "text": "Установи зависимости командой py -m pip install -r requirements.txt."
   },
   {
    "title": "No module named interface...",
    "text": "Проверь папку interface и имена файлов."
   },
   {
    "title": "ImportError: cannot import name...",
    "text": "Сверь названия create_header, create_sound_panel и create_controls."
   },
   {
    "title": "Файл не найден",
    "text": "Запускай py main.py из папки SoundboardStudio."
   }
  ]
 },
 {
  "kicker": "ПРАКТИКА · БАЗОВЫЙ",
  "title": "Собери окно приложения",
  "list": [
   "Создай папку проекта и requirements.txt.",
   "Создай main.py и папку interface с четырьмя файлами.",
   "Запусти программу.",
   "Проверь три области окна."
  ]
 },
 {
  "kicker": "ПРАКТИКА · УЛУЧШЕННЫЙ",
  "title": "Настрой оформление",
  "list": [
   "Измени размер окна.",
   "Подбери другую цветовую тему.",
   "Измени приветствие в строке состояния.",
   "Измени размер заголовка."
  ]
 },
 {
  "kicker": "ПРАКТИКА · ТВОРЧЕСКИЙ",
  "title": "Спроектируй будущую карточку звука",
  "list": [
   "Нарисуй карточку звука на бумаге.",
   "Реши, какие сведения должны быть на карточке.",
   "Подумай, где разместить кнопку импорта WAV.",
   "Помни: при первом запуске коллекция и категории пустые."
  ]
 },
 {
  "kicker": "ИТОГ",
  "title": "У нас есть основа Soundboard Studio",
  "list": [
   "Создали проект и список зависимостей.",
   "Разделили интерфейс на отдельные файлы.",
   "Создали окно CustomTkinter с тёмной темой.",
   "Добавили заголовок и строку состояния.",
   "Подготовили пустую область коллекции и панель управления.",
   "Запустили приложение через main.py."
  ]
 },
 {
  "kicker": "СЛЕДУЮЩЕЕ ЗАНЯТИЕ",
  "title": "Добавим импорт и воспроизведение WAV",
  "lead": "Научимся импортировать WAV-файлы, описывать звуки списками и словарями, создавать карточки и запускать или останавливать воспроизведение.",
  "note": "Сегодня мы подготовили окно. На следующем занятии оно начнёт работать со звуками."
 }
];
