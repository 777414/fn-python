/* Занятие 33. Звуковая панель: импорт и воспроизведение WAV. */
window.LESSONS = window.LESSONS || {};
window.LESSONS['may-2'] = [
 {
  "kicker": "МАЙ · ЗАНЯТИЕ 02",
  "title": "Добавляем звуковую панель",
  "lead": "В прошлом занятии мы создали окно Soundboard Studio. Сегодня научим его принимать WAV-файлы, показывать их в виде карточек и воспроизводить выбранный звук.",
  "note": "Результат: можно выбрать WAV-файл на компьютере, увидеть его карточку, запустить звук и остановить воспроизведение."
 },
 {
  "kicker": "ВСПОМИНАЕМ ПРОЕКТ",
  "title": "Что уже готово?",
  "items": [
   {
    "title": "main.py",
    "text": "Запускает приложение."
   },
   {
    "title": "interface/window.py",
    "text": "Создаёт окно и соединяет части интерфейса."
   },
   {
    "title": "interface/header.py",
    "text": "Показывает название и строку состояния."
   },
   {
    "title": "sound_panel.py и controls.py",
    "text": "Пока содержат заготовки для звуковой панели и кнопок."
   }
  ]
 },
 {
  "kicker": "ПЛАН",
  "title": "Что сделаем сегодня?",
  "list": [
   "Подготовим WAV-файл для проверки.",
   "Научимся выбирать WAV-файл через окно выбора файла.",
   "Будем хранить звуки в списке словарей.",
   "Создадим карточки звуков с кнопками воспроизведения.",
   "Подключим soundfile и sounddevice.",
   "Добавим кнопку остановки и обновление статуса."
  ]
 },
 {
  "kicker": "ФОРМАТ WAV",
  "title": "Почему используем WAV?",
  "lead": "WAV — распространённый формат звуковых файлов без сложного сжатия. С ним удобно работать в нашем учебном проекте.",
  "items": [
   {
    "title": "Сегодня",
    "text": "Выбираем и воспроизводим WAV-файлы."
   },
   {
    "title": "На следующем занятии",
    "text": "Научимся записывать звук с микрофона и сохранять его во временный WAV-файл."
   }
  ]
 },
 {
  "kicker": "ПОДГОТОВКА",
  "title": "Найди короткий WAV-файл",
  "lead": "Подготовь один или несколько WAV-файлов на компьютере. Для первого теста подойдёт короткий звук длительностью несколько секунд.",
  "note": "Файл может лежать в любой папке компьютера. Встроенной коллекции в приложении нет."
 },
 {
  "kicker": "КАК ВЫБРАТЬ ФАЙЛ",
  "title": "Окно выбора файла",
  "lead": "Чтобы не вводить путь вручную, воспользуемся стандартным диалогом tkinter. Пользователь сможет выбрать WAV-файл мышкой.",
  "code": "from tkinter import filedialog",
  "reveals": [
   "filedialog — готовый инструмент для открытия окна выбора файла.",
   "Он входит в стандартную библиотеку Python.",
   "Отдельно устанавливать его не нужно."
  ]
 },
 {
  "kicker": "ФИЛЬТР ФАЙЛОВ",
  "title": "Показываем только WAV-файлы",
  "code": "file_path = filedialog.askopenfilename(\n    title=\\\"Выбери звуковой файл\\\",\n    filetypes=[(\\\"WAV files\\\", \\\"*.wav\\\")]\n)",
  "reveals": [
   "askopenfilename() открывает диалог выбора файла.",
   "title задаёт заголовок окна.",
   "filetypes ограничивает список файлов форматом WAV.",
   "Если пользователь отменит выбор, вернётся пустая строка."
  ]
 },
 {
  "kicker": "ПРОВЕРКА ВЫБОРА",
  "title": "Пользователь может нажать «Отмена»",
  "code": "if not file_path:\n    return",
  "reveals": [
   "Пустая строка означает, что файл не выбран.",
   "return завершает функцию без добавления звука.",
   "Так программа не создаст пустую карточку."
  ]
 },
 {
  "kicker": "КОЛЛЕКЦИЯ",
  "title": "Как будем хранить звуки?",
  "lead": "Создадим обычный список Python. Каждый элемент списка — словарь с названием звука и путём к файлу.",
  "code": "sounds = [\n    {\\\"name\\\": \\\"Аплодисменты\\\", \\\"path\\\": \\\"C:/Sounds/clap.wav\\\"},\n    {\\\"name\\\": \\\"Звонок\\\", \\\"path\\\": \\\"C:/Sounds/bell.wav\\\"}\n]",
  "reveals": [
   "sounds — список звуков.",
   "Каждый словарь описывает один звук.",
   "name — подпись карточки.",
   "path — путь к WAV-файлу на компьютере.",
   "Это пример структуры данных, а не готовая коллекция приложения."
  ]
 },
 {
  "kicker": "ДОБАВЛЕНИЕ В СПИСОК",
  "title": "Создаём словарь нового звука",
  "code": "sound = {\n    \\\"name\\\": file_name,\n    \\\"path\\\": file_path\n}\nsounds.append(sound)",
  "reveals": [
   "Словарь собирает данные об одном звуке.",
   "append() добавляет словарь в конец списка.",
   "Пока список существует только во время работы программы.",
   "Сохранение коллекции в JSON будет на занятии 35."
  ]
 },
 {
  "kicker": "ИМЯ ФАЙЛА",
  "title": "Получаем название для карточки",
  "lead": "Путь к файлу может быть длинным. Для подписи карточки нам нужно только имя файла без папок и расширения.",
  "code": "import os\n\nfile_name = os.path.splitext(\n    os.path.basename(file_path)\n)[0]",
  "reveals": [
   "os.path.basename() оставляет имя файла.",
   "os.path.splitext() отделяет расширение .wav.",
   "[0] берёт имя без расширения.",
   "Например, из C:/Sounds/bell.wav получится bell."
  ]
 },
 {
  "kicker": "ВОСПРОИЗВЕДЕНИЕ",
  "title": "Читаем звуковой файл через soundfile",
  "lead": "Библиотека soundfile умеет читать WAV-файл. Она возвращает звуковые данные и частоту дискретизации.",
  "code": "import soundfile as sf\n\ndata, samplerate = sf.read(file_path)",
  "reveals": [
   "sf.read() открывает звуковой файл.",
   "data — звуковые данные.",
   "samplerate — частота дискретизации.",
   "Эти два значения понадобятся для воспроизведения."
  ]
 },
 {
  "kicker": "ЗАПУСК ЗВУКА",
  "title": "Воспроизводим звук через sounddevice",
  "code": "import sounddevice as sd\n\nsd.play(data, samplerate)",
  "reveals": [
   "sd.play() отправляет звук на устройство воспроизведения.",
   "Первый аргумент — звуковые данные.",
   "Второй аргумент — частота дискретизации.",
   "Воспроизведение запускается без ожидания завершения."
  ]
 },
 {
  "kicker": "ОСТАНОВКА",
  "title": "Как остановить воспроизведение?",
  "code": "sd.stop()",
  "reveals": [
   "sd.stop() останавливает текущее воспроизведение.",
   "Команду вызовем при нажатии отдельной кнопки.",
   "В приложении пользователь сам управляет запуском и остановкой."
  ]
 },
 {
  "kicker": "ОБНОВЛЯЕМ ИНТЕРФЕЙС",
  "title": "Сообщаем пользователю, что происходит",
  "code": "status_label.configure(\n    text=\\\"Сейчас играет: \\\" + sound[\\\"name\\\"]\n)",
  "reveals": [
   "configure() меняет свойства уже созданного элемента.",
   "Мы меняем текст строки состояния.",
   "Так пользователь понимает, какой звук запущен."
  ]
 },
 {
  "kicker": "КАРТОЧКИ",
  "title": "Один словарь — одна карточка",
  "lead": "Для каждого словаря из списка создадим карточку с названием и кнопкой воспроизведения. Функция отрисовки пройдёт по списку циклом for.",
  "code": "for sound in sounds:\n    print(sound[\\\"name\\\"])",
  "reveals": [
   "Цикл for перебирает все элементы списка.",
   "sound — текущий словарь.",
   "sound[\\\"name\\\"] получает название звука.",
   "Вместо print() мы создадим виджет CustomTkinter."
  ]
 },
 {
  "kicker": "ВАЖНАЯ ДЕТАЛЬ",
  "title": "Как передать нужный звук в кнопку?",
  "lead": "Каждая кнопка должна запускать свой файл. Используем lambda, чтобы передать текущий словарь в функцию воспроизведения.",
  "code": "command=lambda item=sound: play_sound(item)",
  "reveals": [
   "command задаёт функцию, которая сработает по нажатию.",
   "lambda создаёт небольшую функцию прямо на месте.",
   "item=sound запоминает именно текущий словарь.",
   "Без этого кнопки могут обращаться не к тому элементу списка."
  ]
 },
 {
  "kicker": "ОБНОВЛЕНИЕ КАРТОЧЕК",
  "title": "Зачем нужна функция refresh_sounds()?",
  "lead": "После импорта нового файла список изменится. Нужно заново показать карточки, чтобы новая запись появилась в окне.",
  "items": [
   {
    "title": "Очистить старые карточки",
    "text": "Удалить виджеты из области коллекции."
   },
   {
    "title": "Перебрать список",
    "text": "Для каждого словаря создать новую карточку."
   },
   {
    "title": "Показать пустое состояние",
    "text": "Если список пуст, написать, что коллекция пока пуста."
   }
  ]
 },
 {
  "kicker": "СВЯЗЫВАЕМ МОДУЛИ",
  "title": "Передаём общий список между файлами",
  "lead": "Список sounds создадим один раз в window.py. Затем передадим его в функции, которые строят панель звуков и кнопки управления.",
  "code": "sounds = []\n\nrefresh_sounds = create_sound_panel(\n    app, sounds, status_label\n)\ncreate_controls(\n    app, sounds, refresh_sounds, status_label\n)",
  "reveals": [
   "Один и тот же список используется разными частями приложения.",
   "create_sound_panel() возвращает функцию обновления карточек.",
   "create_controls() получает эту функцию, чтобы вызвать её после импорта."
  ]
 },
 {
  "kicker": "ФАЙЛ CONTROLS.PY",
  "title": "Добавляем кнопку импорта",
  "lead": "Открой interface/controls.py из прошлого занятия. Замени его содержимое кодом ниже. Здесь будет кнопка выбора WAV-файла.",
  "code": "import os\nimport customtkinter as ctk\nfrom tkinter import filedialog\n\n\ndef create_controls(parent, sounds, refresh_sounds, status_label):\n    controls = ctk.CTkFrame(parent, corner_radius=16)\n    controls.pack(fill=\\\"x\\\", padx=24, pady=(0, 24))\n\n    def import_sound():\n        file_path = filedialog.askopenfilename(\n            title=\\\"Выбери звуковой файл\\\",\n            filetypes=[(\\\"WAV files\\\", \\\"*.wav\\\")]\n        )\n\n        if not file_path:\n            return\n\n        file_name = os.path.splitext(\n            os.path.basename(file_path)\n        )[0]\n\n        sound = {\\\"name\\\": file_name, \\\"path\\\": file_path}\n        sounds.append(sound)\n        refresh_sounds()\n        status_label.configure(text=\\\"Добавлен звук: \\\" + file_name)\n\n    import_button = ctk.CTkButton(\n        controls,\n        text=\\\"＋ Импортировать WAV\\\",\n        command=import_sound\n    )\n    import_button.pack(side=\\\"left\\\", padx=12, pady=12)",
  "reveals": [
   "Это полный код interface/controls.py на текущем этапе.",
   "Кнопка открывает диалог выбора файла.",
   "После выбора создаётся словарь и добавляется в sounds.",
   "Затем refresh_sounds() перерисовывает карточки.",
   "Пока путь к файлу остаётся исходным; копирование в sounds/custom добавим при сохранении коллекции."
  ]
 },
 {
  "kicker": "ФАЙЛ SOUND_PANEL.PY",
  "title": "Создаём карточки звуков",
  "lead": "Открой interface/sound_panel.py и замени его содержимое. Здесь разместим карточки, воспроизведение и остановку.",
  "code": "import customtkinter as ctk\nimport sounddevice as sd\nimport soundfile as sf\n\n\ndef create_sound_panel(parent, sounds, status_label):\n    panel = ctk.CTkFrame(parent, corner_radius=16)\n    panel.pack(fill=\\\"both\\\", expand=True, padx=24, pady=12)\n\n    heading = ctk.CTkLabel(\n        panel, text=\\\"Моя звуковая коллекция\\\",\n        font=(\\\"Arial\\\", 20, \\\"bold\\\")\n    )\n    heading.pack(anchor=\\\"w\\\", padx=20, pady=(18, 8))\n\n    cards = ctk.CTkFrame(panel, fg_color=\\\"transparent\\\")\n    cards.pack(fill=\\\"both\\\", expand=True, padx=16, pady=8)\n\n    def play_sound(sound):\n        try:\n            data, samplerate = sf.read(sound[\\\"path\\\"])\n            sd.play(data, samplerate)\n            status_label.configure(\n                text=\\\"Сейчас играет: \\\" + sound[\\\"name\\\"]\n            )\n        except Exception as error:\n            status_label.configure(text=\\\"Не удалось открыть звук\\\")\n            print(\\\"Ошибка воспроизведения:\\\", error)\n\n    def stop_sound():\n        sd.stop()\n        status_label.configure(text=\\\"Воспроизведение остановлено\\\")\n\n    def refresh_sounds():\n        for widget in cards.winfo_children():\n            widget.destroy()\n\n        if not sounds:\n            empty = ctk.CTkLabel(\n                cards, text=\\\"Коллекция пока пуста. Импортируй WAV-файл.\\\"\n            )\n            empty.pack(anchor=\\\"w\\\", padx=8, pady=8)\n            return\n\n        for sound in sounds:\n            button = ctk.CTkButton(\n                cards,\n                text=\\\"▶  \\\" + sound[\\\"name\\\"],\n                command=lambda item=sound: play_sound(item)\n            )\n            button.pack(fill=\\\"x\\\", padx=8, pady=5)\n\n    stop_button = ctk.CTkButton(\n        panel, text=\\\"■ Остановить звук\\\", command=stop_sound\n    )\n    stop_button.pack(anchor=\\\"e\\\", padx=20, pady=(4, 16))\n\n    refresh_sounds()\n    return refresh_sounds",
  "reveals": [
   "Это полный код interface/sound_panel.py.",
   "sf.read() читает выбранный WAV-файл.",
   "sd.play() запускает воспроизведение, sd.stop() останавливает его.",
   "refresh_sounds() очищает старые карточки и создаёт их заново.",
   "lambda item=sound связывает каждую кнопку с её словарём.",
   "try/except не даёт приложению закрыться при ошибке чтения файла."
  ]
 },
 {
  "kicker": "ФАЙЛ WINDOW.PY",
  "title": "Соединяем части интерфейса",
  "lead": "Теперь обновим interface/window.py. Он создаёт общий список и передаёт его в панель звуков и панель управления.",
  "code": "import customtkinter as ctk\n\nfrom interface.header import create_header\nfrom interface.sound_panel import create_sound_panel\nfrom interface.controls import create_controls\n\n\ndef create_window():\n    ctk.set_appearance_mode(\\\"dark\\\")\n    ctk.set_default_color_theme(\\\"blue\\\")\n\n    app = ctk.CTk()\n    app.title(\\\"Soundboard Studio\\\")\n    app.geometry(\\\"760x560\\\")\n    app.minsize(620, 460)\n\n    status_label = create_header(app)\n    sounds = []\n\n    refresh_sounds = create_sound_panel(\n        app, sounds, status_label\n    )\n    create_controls(\n        app, sounds, refresh_sounds, status_label\n    )\n\n    return app",
  "reveals": [
   "create_header() теперь возвращает строку состояния.",
   "sounds создаётся один раз — общий список для всего окна.",
   "Функции получают один и тот же список.",
   "После импорта controls вызывает refresh_sounds()."
  ]
 },
 {
  "kicker": "ФАЙЛ HEADER.PY",
  "title": "Возвращаем строку состояния",
  "lead": "Открой interface/header.py. В конце функции create_header() добавь return status, чтобы другие части приложения могли менять текст.",
  "code": "    return status",
  "reveals": [
   "Добавь строку с четырьмя пробелами отступа в конец create_header().",
   "Она должна находиться внутри функции create_header(), после создания status.",
   "Остальной код файла оставь таким, как в прошлом занятии."
  ]
 },
 {
  "kicker": "ПРОВЕРЯЕМ СВЯЗИ",
  "title": "Кто с кем обменивается данными?",
  "code": "main.py\n  ↓\nwindow.py\n  ├── header.py → status_label\n  ├── sound_panel.py → sounds, refresh_sounds()\n  └── controls.py → импорт WAV, добавление в sounds",
  "reveals": [
   "main.py запускает окно.",
   "window.py создаёт общий список sounds.",
   "controls.py добавляет в список новый словарь.",
   "sound_panel.py показывает список и воспроизводит выбранный файл.",
   "status_label сообщает пользователю о действиях."
  ]
 },
 {
  "kicker": "ЗАПУСК",
  "title": "Проверяем звуковую панель",
  "list": [
   "Сохрани все изменённые файлы.",
   "Убедись, что установлены customtkinter, sounddevice и soundfile.",
   "Запусти py main.py из папки SoundboardStudio.",
   "Нажми «Импортировать WAV» и выбери звуковой файл.",
   "Нажми на появившуюся карточку.",
   "Проверь кнопку «Остановить звук»."
  ]
 },
 {
  "kicker": "ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ",
  "title": "Проверяем типичные ошибки",
  "items": [
   {
    "title": "No module named sounddevice / soundfile",
    "text": "Выполни py -m pip install -r requirements.txt."
   },
   {
    "title": "Карточка не появилась",
    "text": "Проверь, что после sounds.append(sound) вызывается refresh_sounds()."
   },
   {
    "title": "Кнопка не запускает звук",
    "text": "Проверь путь в sound[\"path\"] и что файл действительно WAV."
   },
   {
    "title": "Нет звука",
    "text": "Проверь громкость, динамики или наушники и выбранное устройство воспроизведения."
   }
  ]
 },
 {
  "kicker": "ПРАКТИКА · БАЗОВЫЙ УРОВЕНЬ",
  "title": "Добавь несколько звуков",
  "list": [
   "Импортируй два или три WAV-файла.",
   "Проверь, что для каждого появился отдельный элемент.",
   "Запусти каждый звук.",
   "Останови воспроизведение кнопкой."
  ]
 },
 {
  "kicker": "ПРАКТИКА · УЛУЧШЕННЫЙ УРОВЕНЬ",
  "title": "Сделай карточки удобнее",
  "list": [
   "Добавь к названию карточки значок.",
   "Измени цвет или размер кнопок.",
   "Добавь в строку состояния название выбранного файла.",
   "Подумай, как показать количество звуков в коллекции."
  ]
 },
 {
  "kicker": "ПРАКТИКА · ТВОРЧЕСКИЙ УРОВЕНЬ",
  "title": "Добавь свою идею",
  "list": [
   "Предложи другой способ расположения карточек.",
   "Добавь короткое описание под названием звука.",
   "Подумай, как обозначить карточку, если файл не удалось прочитать.",
   "Не добавляй сохранение коллекции в JSON — это тема занятия 35."
  ]
 },
 {
  "kicker": "ИТОГ ЗАНЯТИЯ",
  "title": "Soundboard Studio уже играет!",
  "list": [
   "Научились выбирать WAV-файлы через filedialog.",
   "Описали звуки словарями и собрали их в список.",
   "Создали карточки звуков.",
   "Подключили soundfile для чтения WAV.",
   "Подключили sounddevice для воспроизведения и остановки.",
   "Связали интерфейс через общий список и функции."
  ]
 },
 {
  "kicker": "СЛЕДУЮЩЕЕ ЗАНЯТИЕ",
  "title": "Запишем собственный звук",
  "lead": "На следующем занятии подключим микрофон, ограничим запись пятью секундами, научимся прослушивать её, повторять запись и выбирать — сохранить или отменить.",
  "note": "Сегодня приложение воспроизводит WAV-файлы с компьютера. В следующий раз добавим возможность создавать собственные звуки."
 }
];
