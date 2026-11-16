/* Занятие 35. Управление коллекцией и сохранение данных в Soundboard Studio. */
window.LESSONS = window.LESSONS || {};
window.LESSONS['may-4'] = [
 {
  "kicker": "МАЙ · ЗАНЯТИЕ 04",
  "title": "Научим Soundboard Studio запоминать звуки",
  "lead": "Сейчас коллекция исчезает после закрытия программы. Сегодня добавим названия, переименование, удаление и сохранение списка звуков в JSON.",
  "note": "Результат: после перезапуска приложения коллекция снова загружается со всеми названиями и файлами."
 },
 {
  "kicker": "ВСПОМИНАЕМ",
  "title": "Что уже умеет наша программа?",
  "items": [
   {
    "title": "Импорт WAV",
    "text": "Добавляем звуковой файл с компьютера."
   },
   {
    "title": "Запись с микрофона",
    "text": "Записываем до пяти секунд и прослушиваем."
   },
   {
    "title": "Карточки",
    "text": "Запускаем и останавливаем выбранный звук."
   }
  ]
 },
 {
  "kicker": "ПРОБЛЕМА",
  "title": "Почему коллекция исчезает?",
  "lead": "Сейчас список sounds создаётся в памяти при запуске программы. Когда окно закрывается, Python завершает работу и список пропадает.",
  "code": "sounds = [\n    {\"name\": \"Аплодисменты\", \"path\": \"sounds/custom/clap.wav\"},\n    {\"name\": \"Моя запись\", \"path\": \"sounds/custom/recording.wav\"}\n]",
  "reveals": [
   "Список хранится только во время работы программы.",
   "Нужно записать его содержимое в файл.",
   "Для этого используем JSON."
  ]
 },
 {
  "kicker": "ПЛАН",
  "title": "Что сделаем сегодня?",
  "list": [
   "Будем копировать импортированные WAV-файлы в папку проекта.",
   "Добавим ввод названия звука.",
   "Научимся переименовывать карточки.",
   "Добавим удаление звука и его файла.",
   "Создадим storage.py для JSON.",
   "Научим программу загружать коллекцию при запуске."
  ]
 },
 {
  "kicker": "ДВА ВИДА ДАННЫХ",
  "title": "Аудиофайл и описание — не одно и то же",
  "items": [
   {
    "title": "WAV-файл",
    "text": "Содержит сам звук и хранится в sounds/custom/."
   },
   {
    "title": "JSON-файл",
    "text": "Содержит название звука и путь к WAV-файлу."
   }
  ],
  "note": "В JSON не записываем звуковые данные. Только текстовое описание коллекции."
 },
 {
  "kicker": "ПРИМЕР JSON",
  "title": "Как будет выглядеть сохранённая коллекция?",
  "code": "[\n    {\n        \"name\": \"Аплодисменты\",\n        \"path\": \"sounds/custom/clap.wav\"\n    },\n    {\n        \"name\": \"Моя запись\",\n        \"path\": \"sounds/custom/recording.wav\"\n    }\n]",
  "reveals": [
   "Каждый объект описывает один звук.",
   "name — название карточки.",
   "path — относительный путь к WAV-файлу внутри проекта.",
   "Квадратные скобки означают список."
  ]
 },
 {
  "kicker": "ГДЕ ХРАНИМ",
  "title": "Для коллекции создадим папку data",
  "code": "SoundboardStudio/\n  main.py\n  storage.py\n  data/\n    sounds.json\n  sounds/\n    custom/",
  "reveals": [
   "storage.py будет отвечать за чтение и запись JSON.",
   "data/sounds.json появится при первом сохранении.",
   "WAV-файлы остаются отдельно в sounds/custom/."
  ]
 },
 {
  "kicker": "НОВЫЙ МОДУЛЬ",
  "title": "Создаём storage.py",
  "lead": "Создай файл storage.py в корне SoundboardStudio — рядом с main.py и recorder.py.",
  "code": "SoundboardStudio/\n  main.py\n  recorder.py\n  storage.py"
 },
 {
  "kicker": "ПОДКЛЮЧАЕМ JSON",
  "title": "Импортируем нужные инструменты",
  "code": "import json\nimport os\n\nDATA_FOLDER = \"data\"\nDATA_FILE = os.path.join(DATA_FOLDER, \"sounds.json\")",
  "reveals": [
   "json — стандартный модуль Python для работы с JSON.",
   "os.path.join() соединяет части пути.",
   "DATA_FILE хранит путь к файлу коллекции."
  ]
 },
 {
  "kicker": "СОХРАНЕНИЕ",
  "title": "Функция save_sounds()",
  "lead": "Перед записью создадим папку data, если её ещё нет. Затем сохраним список sounds в JSON.",
  "code": "def save_sounds(sounds):\n    os.makedirs(DATA_FOLDER, exist_ok=True)\n\n    with open(DATA_FILE, \"w\", encoding=\"utf-8\") as file:\n        json.dump(sounds, file, ensure_ascii=False, indent=4)",
  "reveals": [
   "os.makedirs() создаёт папку.",
   "with open(..., \"w\") открывает файл для записи.",
   "json.dump() превращает список Python в JSON.",
   "ensure_ascii=False сохраняет русские буквы.",
   "indent=4 делает файл удобным для чтения."
  ]
 },
 {
  "kicker": "ЗАГРУЗКА",
  "title": "Функция load_sounds()",
  "code": "def load_sounds():\n    if not os.path.exists(DATA_FILE):\n        return []\n\n    with open(DATA_FILE, \"r\", encoding=\"utf-8\") as file:\n        return json.load(file)",
  "reveals": [
   "Если файла ещё нет, возвращаем пустой список.",
   "Режим \"r\" открывает файл для чтения.",
   "json.load() превращает JSON обратно в список Python.",
   "Теперь программа может восстановить коллекцию."
  ]
 },
 {
  "kicker": "ПОЛНЫЙ ФАЙЛ",
  "title": "Сохрани storage.py целиком",
  "code": "import json\nimport os\n\nDATA_FOLDER = \"data\"\nDATA_FILE = os.path.join(DATA_FOLDER, \"sounds.json\")\n\n\ndef save_sounds(sounds):\n    os.makedirs(DATA_FOLDER, exist_ok=True)\n\n    with open(DATA_FILE, \"w\", encoding=\"utf-8\") as file:\n        json.dump(sounds, file, ensure_ascii=False, indent=4)\n\n\ndef load_sounds():\n    if not os.path.exists(DATA_FILE):\n        return []\n\n    with open(DATA_FILE, \"r\", encoding=\"utf-8\") as file:\n        return json.load(file)",
  "reveals": [
   "Создай storage.py рядом с main.py.",
   "Вставь весь код целиком.",
   "Функции принимают и возвращают обычный список словарей."
  ]
 },
 {
  "kicker": "ИМПОРТ WAV",
  "title": "Копируем выбранный файл в проект",
  "lead": "Раньше приложение запоминало исходный путь к WAV. Если файл переместить, карточка перестанет работать. Теперь будем копировать выбранный файл в sounds/custom/.",
  "code": "import shutil\n\nos.makedirs(\"sounds/custom\", exist_ok=True)\nshutil.copy2(source_path, destination_path)",
  "reveals": [
   "shutil.copy2() копирует файл.",
   "Оригинал остаётся на компьютере.",
   "В коллекции храним путь к копии внутри проекта.",
   "Так приложение не зависит от исходной папки пользователя."
  ]
 },
 {
  "kicker": "ИМЯ ФАЙЛА",
  "title": "Не перезаписываем существующие звуки",
  "lead": "Если в папке уже есть clap.wav, новый файл с таким именем должен получить другое имя.",
  "code": "file_name = os.path.basename(source_path)\nname, extension = os.path.splitext(file_name)\ndestination_path = os.path.join(\"sounds/custom\", file_name)\nnumber = 1\n\nwhile os.path.exists(destination_path):\n    new_name = name + \"_\" + str(number) + extension\n    destination_path = os.path.join(\"sounds/custom\", new_name)\n    number += 1",
  "reveals": [
   "basename() получает имя файла без папок.",
   "splitext() отделяет расширение .wav.",
   "Цикл ищет свободное имя: clap_1.wav, clap_2.wav и так далее.",
   "Старый файл не будет случайно заменён."
  ]
 },
 {
  "kicker": "НАЗВАНИЕ КАРТОЧКИ",
  "title": "Спрашиваем название у пользователя",
  "code": "dialog = ctk.CTkInputDialog(\n    text=\"Как назвать этот звук?\",\n    title=\"Название звука\"\n)\nsound_name = dialog.get_input()",
  "reveals": [
   "CTkInputDialog показывает небольшое окно с полем ввода.",
   "get_input() возвращает введённый текст.",
   "Если пользователь нажал отмену, результат будет None."
  ]
 },
 {
  "kicker": "ПРОВЕРКА НАЗВАНИЯ",
  "title": "Не добавляем пустое название",
  "code": "if sound_name is None or not sound_name.strip():\n    status_label.configure(text=\"Звук не добавлен: нужно название\")\n    return",
  "reveals": [
   "strip() убирает пробелы по краям текста.",
   "Если после этого строка пустая, название не подходит.",
   "return завершает обработчик, не добавляя файл в коллекцию."
  ]
 },
 {
  "kicker": "ДОБАВЛЯЕМ ЗВУК",
  "title": "Собираем словарь и сохраняем список",
  "code": "sounds.append({\n    \"name\": sound_name.strip(),\n    \"path\": destination_path\n})\n\nsave_sounds(sounds)\nrefresh_sounds()",
  "reveals": [
   "Создаём словарь с названием и путём.",
   "append() добавляет его в общий список.",
   "save_sounds() сразу обновляет JSON.",
   "refresh_sounds() обновляет карточки на экране."
  ]
 },
 {
  "kicker": "ПЕРЕИМЕНОВАНИЕ",
  "title": "Меняем название, а не аудиофайл",
  "lead": "Переименование — это изменение значения name в словаре. Сам WAV-файл остаётся прежним.",
  "code": "dialog = ctk.CTkInputDialog(\n    text=\"Новое название:\",\n    title=\"Переименовать звук\"\n)\nnew_name = dialog.get_input()\n\nif new_name and new_name.strip():\n    sound[\"name\"] = new_name.strip()\n    save_sounds(sounds)\n    refresh_sounds()",
  "reveals": [
   "В диалог передаём текущее название или просим новое.",
   "Меняем только поле name.",
   "Путь к WAV-файлу не изменяется.",
   "После переименования сохраняем JSON и обновляем карточки."
  ]
 },
 {
  "kicker": "УДАЛЕНИЕ",
  "title": "Удаляем карточку и её WAV-файл",
  "code": "if os.path.exists(sound[\"path\"]):\n    os.remove(sound[\"path\"])\n\nsounds.remove(sound)\nsave_sounds(sounds)\nrefresh_sounds()",
  "reveals": [
   "Сначала проверяем, существует ли файл.",
   "os.remove() удаляет WAV-файл из папки проекта.",
   "remove() убирает словарь из списка.",
   "После этого сохраняем обновлённую коллекцию."
  ]
 },
 {
  "kicker": "ПОДТВЕРЖДЕНИЕ",
  "title": "Перед удалением спросим пользователя",
  "code": "from tkinter import messagebox\n\nconfirmed = messagebox.askyesno(\n    \"Удалить звук?\",\n    \"Удалить карточку и аудиофайл?\"\n)\n\nif confirmed:\n    delete_sound(sound)",
  "reveals": [
   "askyesno() показывает вопрос с кнопками Да и Нет.",
   "Удаляем только после подтверждения.",
   "Удаление WAV-файла необратимо, поэтому спрашиваем заранее."
  ]
 },
 {
  "kicker": "ФАЙЛ CONTROLS.PY",
  "title": "Сохраняем импорт WAV и запись",
  "lead": "Открой interface/controls.py и замени содержимое. Кнопки импорта и записи остаются, но теперь обе операции спрашивают название и сохраняют изменения в JSON.",
  "code": "import os\nimport shutil\nimport customtkinter as ctk\nfrom tkinter import filedialog\n\nfrom recorder import record_audio, play_preview, cancel_preview, save_preview\nfrom storage import save_sounds\n\n\ndef create_controls(parent, sounds, refresh_sounds, status_label):\n    controls = ctk.CTkFrame(parent, corner_radius=16)\n    controls.pack(fill=\"x\", padx=24, pady=(0, 24))\n    preview_path = None\n\n    def ask_name(default_name):\n        dialog = ctk.CTkInputDialog(\n            text=\"Название звука:\", title=\"Название звука\"\n        )\n        value = dialog.get_input()\n        if value is None or not value.strip():\n            return None\n        return value.strip()\n\n    def import_sound():\n        source_path = filedialog.askopenfilename(\n            title=\"Выбери WAV-файл\",\n            filetypes=[(\"WAV files\", \"*.wav\")]\n        )\n        if not source_path:\n            return\n\n        os.makedirs(\"sounds/custom\", exist_ok=True)\n        file_name = os.path.basename(source_path)\n        name, extension = os.path.splitext(file_name)\n        destination_path = os.path.join(\"sounds/custom\", file_name)\n        number = 1\n\n        while os.path.exists(destination_path):\n            new_name = name + \"_\" + str(number) + extension\n            destination_path = os.path.join(\"sounds/custom\", new_name)\n            number += 1\n\n        sound_name = ask_name(name)\n        if sound_name is None:\n            status_label.configure(text=\"Импорт отменён\")\n            return\n\n        shutil.copy2(source_path, destination_path)\n        sounds.append({\"name\": sound_name, \"path\": destination_path})\n        save_sounds(sounds)\n        refresh_sounds()\n        status_label.configure(text=\"Добавлен звук: \" + sound_name)\n\n    def start_recording():\n        nonlocal preview_path\n        try:\n            preview_path = record_audio(status_label)\n            show_preview_controls()\n        except Exception as error:\n            status_label.configure(text=\"Не удалось записать звук. Проверь микрофон.\")\n            print(\"Ошибка записи:\", error)\n\n    def listen_recording():\n        try:\n            play_preview(preview_path)\n            status_label.configure(text=\"Прослушивание записи\")\n        except Exception as error:\n            status_label.configure(text=\"Не удалось прослушать запись\")\n            print(\"Ошибка прослушивания:\", error)\n\n    def repeat_recording():\n        cancel_preview(preview_path)\n        start_recording()\n\n    def save_recording():\n        sound_name = ask_name(\"Моя запись\")\n        if sound_name is None:\n            status_label.configure(text=\"Сохранение отменено\")\n            return\n\n        final_path = save_preview(preview_path)\n        sounds.append({\"name\": sound_name, \"path\": final_path})\n        save_sounds(sounds)\n        refresh_sounds()\n        show_main_controls()\n        status_label.configure(text=\"Запись добавлена: \" + sound_name)\n\n    def cancel_recording():\n        cancel_preview(preview_path)\n        show_main_controls()\n        status_label.configure(text=\"Запись отменена\")\n\n    def show_main_controls():\n        for widget in controls.winfo_children():\n            widget.destroy()\n        ctk.CTkButton(\n            controls, text=\"＋ Импортировать WAV\", command=import_sound\n        ).pack(side=\"left\", padx=8, pady=12)\n        ctk.CTkButton(\n            controls, text=\"● Записать звук\", command=start_recording\n        ).pack(side=\"left\", padx=8, pady=12)\n\n    def show_preview_controls():\n        for widget in controls.winfo_children():\n            widget.destroy()\n        ctk.CTkButton(\n            controls, text=\"▶ Прослушать\", command=listen_recording\n        ).pack(side=\"left\", padx=5, pady=12)\n        ctk.CTkButton(\n            controls, text=\"↻ Повторить\", command=repeat_recording\n        ).pack(side=\"left\", padx=5, pady=12)\n        ctk.CTkButton(\n            controls, text=\"Сохранить\", command=save_recording\n        ).pack(side=\"left\", padx=5, pady=12)\n        ctk.CTkButton(\n            controls, text=\"Отменить\", command=cancel_recording\n        ).pack(side=\"left\", padx=5, pady=12)\n\n    show_main_controls()",
  "reveals": [
   "Полностью замени interface/controls.py.",
   "Импортированный WAV копируется внутрь проекта.",
   "Для импорта и записи пользователь вводит название.",
   "После каждого добавления список сразу сохраняется в JSON.",
   "Кнопка отмены записи по-прежнему удаляет временный WAV."
  ]
 },
 {
  "kicker": "ФАЙЛ SOUND_PANEL.PY",
  "title": "Добавляем переименование и удаление",
  "lead": "Открой interface/sound_panel.py и замени содержимое. Каждая карточка получит кнопки «Переименовать» и «Удалить».",
  "code": "import os\nimport customtkinter as ctk\nimport sounddevice as sd\nimport soundfile as sf\nfrom tkinter import messagebox\n\nfrom storage import save_sounds\n\n\ndef create_sound_panel(parent, sounds, status_label):\n    panel = ctk.CTkFrame(parent, corner_radius=16)\n    panel.pack(fill=\"both\", expand=True, padx=24, pady=12)\n\n    heading = ctk.CTkLabel(\n        panel, text=\"Моя звуковая коллекция\",\n        font=(\"Arial\", 20, \"bold\")\n    )\n    heading.pack(anchor=\"w\", padx=20, pady=(18, 8))\n    cards = ctk.CTkFrame(panel, fg_color=\"transparent\")\n    cards.pack(fill=\"both\", expand=True, padx=16, pady=8)\n\n    def play_sound(sound):\n        try:\n            data, samplerate = sf.read(sound[\"path\"])\n            sd.play(data, samplerate)\n            status_label.configure(text=\"Сейчас играет: \" + sound[\"name\"])\n        except Exception as error:\n            status_label.configure(text=\"Не удалось открыть звук\")\n            print(\"Ошибка воспроизведения:\", error)\n\n    def rename_sound(sound):\n        dialog = ctk.CTkInputDialog(\n            text=\"Новое название:\", title=\"Переименовать звук\"\n        )\n        new_name = dialog.get_input()\n        if new_name is None or not new_name.strip():\n            return\n        sound[\"name\"] = new_name.strip()\n        save_sounds(sounds)\n        refresh_sounds()\n        status_label.configure(text=\"Название изменено\")\n\n    def delete_sound(sound):\n        confirmed = messagebox.askyesno(\n            \"Удалить звук?\", \"Удалить карточку и аудиофайл?\"\n        )\n        if not confirmed:\n            return\n        sd.stop()\n        if os.path.exists(sound[\"path\"]):\n            os.remove(sound[\"path\"])\n        sounds.remove(sound)\n        save_sounds(sounds)\n        refresh_sounds()\n        status_label.configure(text=\"Звук удалён\")\n\n    def refresh_sounds():\n        for widget in cards.winfo_children():\n            widget.destroy()\n        if not sounds:\n            ctk.CTkLabel(\n                cards, text=\"Коллекция пока пуста. Импортируй WAV-файл.\"\n            ).pack(anchor=\"w\", padx=8, pady=8)\n            return\n\n        for sound in sounds:\n            card = ctk.CTkFrame(cards, corner_radius=10)\n            card.pack(fill=\"x\", padx=8, pady=5)\n            ctk.CTkButton(\n                card, text=\"▶  \" + sound[\"name\"], width=220,\n                command=lambda item=sound: play_sound(item)\n            ).pack(side=\"left\", padx=6, pady=6)\n            ctk.CTkButton(\n                card, text=\"Переименовать\", width=120,\n                command=lambda item=sound: rename_sound(item)\n            ).pack(side=\"left\", padx=4, pady=6)\n            ctk.CTkButton(\n                card, text=\"Удалить\", width=90,\n                fg_color=\"#9b3d48\", hover_color=\"#7e3039\",\n                command=lambda item=sound: delete_sound(item)\n            ).pack(side=\"left\", padx=4, pady=6)\n\n    ctk.CTkButton(\n        panel, text=\"■ Остановить звук\", command=sd.stop\n    ).pack(anchor=\"e\", padx=20, pady=(4, 16))\n    refresh_sounds()\n    return refresh_sounds",
  "reveals": [
   "Полностью замени interface/sound_panel.py.",
   "Кнопки привязаны к конкретному словарю через lambda item=sound.",
   "Переименование меняет только название.",
   "Удаление спрашивает подтверждение и удаляет WAV-файл из sounds/custom."
  ]
 },
 {
  "kicker": "ФАЙЛ WINDOW.PY",
  "title": "Передаём функцию сохранения в панели",
  "lead": "В interface/window.py создадим одну функцию save_collection(). Её получат и панель звуков, и панель управления.",
  "code": "from storage import save_sounds\n\n# Внутри create_window(), после создания sounds:\ndef save_collection():\n    save_sounds(sounds)\n\nrefresh_sounds = create_sound_panel(\n    app, sounds, status_label\n)\ncreate_controls(\n    app, sounds, refresh_sounds, status_label, save_collection\n)",
  "reveals": [
   "Функция save_collection() сохраняет текущий общий список.",
   "Панель управления вызывает её после импорта и записи.",
   "Панель звуков сохраняет список после переименования и удаления.",
   "В следующем слайде будет полный файл window.py."
  ]
 },
 {
  "kicker": "ПОЛНЫЙ ФАЙЛ",
  "title": "Сохрани interface/window.py целиком",
  "code": "import customtkinter as ctk\n\nfrom interface.header import create_header\nfrom interface.sound_panel import create_sound_panel\nfrom interface.controls import create_controls\nfrom storage import save_sounds\n\n\ndef create_window(sounds):\n    ctk.set_appearance_mode(\"dark\")\n    ctk.set_default_color_theme(\"blue\")\n\n    app = ctk.CTk()\n    app.title(\"Soundboard Studio\")\n    app.geometry(\"760x560\")\n    app.minsize(620, 460)\n\n    status_label = create_header(app)\n\n    def save_collection():\n        save_sounds(sounds)\n\n    refresh_sounds = create_sound_panel(\n        app, sounds, status_label\n    )\n    create_controls(\n        app, sounds, refresh_sounds, status_label, save_collection\n    )\n\n    return app",
  "reveals": [
   "Полностью замени interface/window.py.",
   "Теперь create_window() получает список, который загрузили до создания окна.",
   "save_collection() использует тот же список, что и карточки."
  ]
 },
 {
  "kicker": "ФАЙЛ MAIN.PY",
  "title": "Загружаем коллекцию до открытия окна",
  "lead": "Сначала читаем JSON, затем передаём список в create_window().",
  "code": "from storage import load_sounds\nfrom interface.window import create_window\n\nsounds = load_sounds()\napp = create_window(sounds)\napp.mainloop()",
  "reveals": [
   "load_sounds() читает сохранённый список.",
   "create_window(sounds) получает готовую коллекцию.",
   "Теперь карточки можно показать сразу после запуска."
  ]
 },
 {
  "kicker": "ПОЛНЫЙ ФАЙЛ",
  "title": "Сохрани main.py целиком",
  "code": "from storage import load_sounds\nfrom interface.window import create_window\n\nsounds = load_sounds()\napp = create_window(sounds)\napp.mainloop()",
  "reveals": [
   "Открой main.py в корне проекта.",
   "Замени старый код этим вариантом.",
   "Запускай программу командой py main.py из папки SoundboardStudio."
  ]
 },
 {
  "kicker": "ПУТИ К ФАЙЛАМ",
  "title": "Почему копируем WAV внутрь проекта?",
  "items": [
   {
    "title": "Надёжнее",
    "text": "Если исходный файл переместят или удалят, копия в проекте останется."
   },
   {
    "title": "Удобнее для JSON",
    "text": "Можно сохранять короткий относительный путь, например sounds/custom/clap.wav."
   },
   {
    "title": "Проще переносить",
    "text": "Папку проекта можно перенести на другой компьютер вместе со звуками и JSON."
   }
  ]
 },
 {
  "kicker": "ПРОВЕРКА",
  "title": "Проверь сохранение между запусками",
  "list": [
   "Запусти py main.py.",
   "Импортируй WAV и задай ему название.",
   "Запиши собственный звук и сохрани его под названием.",
   "Переименуй одну карточку.",
   "Закрой приложение и запусти снова.",
   "Проверь, что названия и карточки восстановились."
  ]
 },
 {
  "kicker": "ПРОВЕРКА УДАЛЕНИЯ",
  "title": "Убедись, что удаление работает",
  "list": [
   "Выбери ненужную карточку.",
   "Нажми «Удалить».",
   "Подтверди действие.",
   "Проверь, что карточка исчезла.",
   "Закрой и снова открой приложение — удалённый звук не должен вернуться."
  ]
 },
 {
  "kicker": "ЕСЛИ КОЛЛЕКЦИЯ НЕ ЗАГРУЗИЛАСЬ",
  "title": "Что проверить?",
  "items": [
   {
    "title": "Файл sounds.json не найден",
    "text": "Он создаётся после первого добавления или изменения звука. Если коллекция ещё не сохранялась, это нормально."
   },
   {
    "title": "Не найден WAV-файл",
    "text": "Проверь, что файл лежит в sounds/custom и путь в JSON совпадает с именем файла."
   },
   {
    "title": "Ошибка импорта storage",
    "text": "storage.py должен лежать рядом с main.py, а не в папке interface."
   },
   {
    "title": "Русские названия отображаются неверно",
    "text": "Проверь encoding=\"utf-8\" при открытии JSON."
   }
  ]
 },
 {
  "kicker": "ПРАКТИКА · БАЗОВЫЙ",
  "title": "Создай личную коллекцию",
  "list": [
   "Добавь два WAV-файла.",
   "Запиши собственный звук.",
   "Задай каждому понятное название.",
   "Перезапусти приложение и проверь загрузку."
  ]
 },
 {
  "kicker": "ПРАКТИКА · УЛУЧШЕННЫЙ",
  "title": "Наведи порядок в коллекции",
  "list": [
   "Переименуй несколько звуков.",
   "Удали ненужную карточку.",
   "Проверь, что после перезапуска изменения сохранились.",
   "Открой data/sounds.json и найди названия своих звуков."
  ]
 },
 {
  "kicker": "ПРАКТИКА · ТВОРЧЕСКИЙ",
  "title": "Придумай правила для своей коллекции",
  "list": [
   "Придумай понятные названия для звуков.",
   "Раздели звуки по смыслу с помощью названий.",
   "Подбери короткие WAV-файлы для разных ситуаций.",
   "Не усложняй структуру проекта: используем список словарей и функции."
  ]
 },
 {
  "kicker": "ИТОГ ЗАНЯТИЯ",
  "title": "Теперь коллекция запоминается!",
  "list": [
   "Импортируемые WAV-файлы копируются в папку проекта.",
   "Пользователь задаёт название каждому звуку.",
   "Карточки можно переименовывать и удалять.",
   "Описание коллекции сохраняется в JSON.",
   "При запуске список загружается из sounds.json.",
   "WAV-файлы хранятся отдельно от JSON."
  ]
 },
 {
  "kicker": "СЛЕДУЮЩЕЕ ЗАНЯТИЕ",
  "title": "Соберём и проверим весь проект",
  "lead": "На последнем занятии проверим все модули, улучшим обработку ошибок, пройдём основные сценарии и подготовим демонстрацию Soundboard Studio.",
  "note": "Сегодня приложение уже умеет хранить личную коллекцию между запусками. Осталось провести финальную проверку и показать результат."
 }
];
