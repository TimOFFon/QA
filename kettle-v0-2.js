function Action() {
  this.name = this.constructor.name.toLowerCase();
}

//======================================================
//                Prototype Action
//=====================================================

Action.prototype.txt = {
  //---------------- инструкции --------------------
  putSink: () => {
    console.log(`Поставьте чайник под кран командой '${this.name}.filling'`);
  },
  putSinkD: () => console.log(`Вы взяли чайник и поставили под кран`),
  openLid: (str) =>
    console.log(`
    Вы открыли крышку чайника.
    Теперь подайте воду открыв кран
    командой '${str}.on',
    но будьте внимательны чтобы
    вовремя закрыть кран командой
    '${str}.off' (заранее скопируйте её)
    СЛЕДИТЕ ЗА НАПОЛНЕНИЕМ ЧАЙНИКА!!!`),
  remind: (str) => `
    Напоминание: Закрыть кран
    команда ''${str}.off''!`,
  gram: (count, txt) => `        ${count} грамм ${txt}`,
  liter: (txt) => `        1 литр ${txt}`,
  liter_1_7: (txt) => `
    Вниамание! 
    В чайнике 1.7 литров!
    Предел рекомендованного значения! ${txt}`,
  edge: (count, str) => `
    Вниамание!
    До края чайника осталость ${2000 - count}грамм ${str}`,
  crowded: (str) => `
    Чайник переполнен!
    Вода лъётся через край!
    Закройте кран командой '${str}.off'!
    Не забудьте отлить лишнюю воду!`,
  pours: () => console.log(`вода льётся...`),
  tapClose: (volume) =>
    console.log(`
    Кран закрыт!
    Вода не течёт!
    В чайнике ${volume} грамм воды.`),
  close: () => console.log(`Вы закрыли крышку чайника.`),
  satisfied: (str) =>
    console.log(`
    Вас устраивает количество воды?
    Если воды достаточно, то наберите команду
    '${str}.go',
    Если нет, повторите опперацию сначала,
    набрав команду '${str}.on'
    чтобы открыть кран, 
    и '${str}.off'
    чтобы закрыть`),
  putStove: (str, volume) =>
    console.log(`
    Вы поставили чайник на
    нагревательную платформу.
    В чайнике ${volume} грамм воды, 
    можете приступать к кипячению
    набрав команду 'kettle.on'`),
};

Action.prototype.txt.putSink(this.name);

Action.prototype.information = {
  waterVolume: null,
  platform: false,
  getVolume() {
    return this.waterVolume;
  },
  getStatPlat() {
    return this.platform;
  },
};

//------------------ Функции ----------------------------

Action.prototype.filling = function () {
  console.clear();
  this.txt.putSinkD();
  let message_1 = setTimeout(() => {
    return console.clear();
  }, 2000);

  let message_2 = setTimeout(() => {
    return this.txt.openLid(this.name);
  }, 3000);
};

Action.prototype.on = function () {
  clearTimeout(this.filling.message_2);
  console.clear();

  this.count = this.information.waterVolume;
  this.message = null;
  this.warning = this.txt.remind(this.name);

  this.waterValue = setInterval(() => {
    this.count += 100;
    this.message = this.txt.gram(this.count, this.warning);

    if (this.count === 1000) {
      this.message = this.txt.liter(this.warning);
    }

    if (this.count === 1700) {
      this.message = this.txt.liter_1_7(this.warning);
    }

    if (this.count > 1700) {
      this.message = this.txt.edge(this.count, this.warning);
    }

    if (this.count >= 2000) {
      this.message = this.txt.crowded(this.name);
      this.count = 2000;
      clearInterval(this.waterValue);
    }

    this.information.waterVolume = this.count;

    console.clear();

    this.flowing = setTimeout(() => {
      this.txt.pours();
    }, 1000);

    console.clear();

    console.log(this.message);
  }, 2000);
};
Action.prototype.off = function () {
  clearTimeout(this.flowing);
  clearInterval(this.waterValue);
  console.clear();
  this.txt.tapClose(this.information.waterVolume);

  let message_3 = setTimeout(() => {
    this.txt.satisfied(this.name);
  }, 3000);
};

Action.prototype.go = function () {
  clearTimeout(this.off.message_3);
  let message_4 = setTimeout(() => {
    console.clear();
    this.txt.close();
  }, 1000);

  let message_5 = setTimeout(() => {
    clearTimeout(message_4);
    console.clear();
    this.txt.putStove(this.name, this.information.waterVolume);
  }, 2000);

  kettle.options.valume = this.information.waterVolume;
  kettle.options.temp = 10;
  kettle.options.position = true;
};

function Kettle(name) {}

//=======================================================
//               Kettle prototype
//=======================================================
Kettle.prototype.options = {
  valume: null,
  //    valume: 300,
  name: this.name,
  temp: null,
  // temp: 10,
  goalTemp: 100,
  status: "off",
  boilingTime: null,
  power: null,
  // position: false,
  // position: true,
  heatСap: 4183,
};

Kettle.prototype.on = function () {
  console.clear();
  this.options.power = 3000;
  this.options.status = "on";
  this.options.boilingTime = Math.round(
    (this.options.heatСap *
      (this.options.valume / 1000) *
      (this.options.goalTemp - this.options.temp)) /
      this.options.power
  );

  let tikTemp = Math.round(
    (this.options.goalTemp - this.options.temp) / this.options.boilingTime
  );

  let timer = setInterval(() => {
    this.options.boilingTime = this.options.boilingTime - 1;
    this.options.temp += tikTemp;
    console.clear();
    console.log(`Timer: ${this.options.boilingTime}sec`);
    console.log(`Temp: ${this.options.temp}C`);
    if (this.options.temp >= 100) {
      clearInterval(timer);
      console.log("Чайник закипел!");
    }
  }, 1000);
};

let action = new Action();
let kettle = new Kettle("my_kettle");
