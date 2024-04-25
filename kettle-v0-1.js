/*========================================================
==========================================================
     Формула закипания   t = c * m * (t2 - t1) / W
==========================================================
==========================================================
вместительные модели чайников (порядка 2 литров) 
могут потреблять до 3000 Вт
----------------------------------------------------------
t - время нагрева, сек
W - мощность водонагревателя, Вт (3000 Вт)
c - теплоемкость нагреваемого материала, Дж/кг*К (вода = 4183 Дж/кг*К)
m - масса нагреваемого материала, кг (для воды можно принять условно 1 кг = 1 литр)
t1 - температура исходная, К
t2 - т
*/
let W = 3000;
let c = 4183;
let m = 2;
let t1 = 10;
let t2 = 100;
let t = Math.round(c * m * (t2 - t1) / W);
// console.log(t);

/*
    Реализовать класс с примитивынми функциями чайника:
    1) Набрать воды
    2) Включить нагрев
    3) Процесс закипания
    4) Оповещение выключения
*/

function New_Kettle(name) {
    this.name = name;
    this.txt = {
        //---------------- инструкции --------------------
        putSink: (str) => {
            console.log(`Поставьте чайник под кран командой '${str}.filling'`);
        },
        putSinkD: () => console.log(`Вы взяли чайник и поставили под кран`),
        openLid: (str) => console.log(`
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
        pours: ()=> console.log(`вода льётся...`),
        tapClose: (volume)=> console.log(`
        Кран закрыт!
        Вода не течёт!
        В чайнике ${volume} грамм воды.`),
        close: ()=> console.log(`Вы закрыли крышку чайника.`),
        satisfied: (str)=> console.log(`
        Вас устраивает количество воды?
        Если воды достаточно, то наберите команду
        '${str}.go',
        Если нет, повторите опперацию сначала,
        набрав команду '${str}.on'
        чтобы открыть кран, 
        и '${str}.off'
        чтобы закрыть`),
        putStove: (str, volume)=> console.log(`
        Вы поставили чайник на
        нагревательную платформу.
        В чайнике ${volume} грамм воды, 
        можете приступать к кипячению
        набрав команду ${str}[xxx]`),
    };
    
   this.txt.putSink(this.name);
    // Чайник -----------------------------------------------
    this.kettle = {
        volume: null,
    };
    //------------------------------------------------------

    // Набор воды --------------------------------------------
    /* 
    1.Взять чайник и поставить под кран (текст)
    2.Открыть крышку (текст)
    3.Открыть краник (команда)(логирование)
    4.Закрыть краник (команда)
    5.Закрыть крышку (текст)
    6.Поставить на нагревательную платформу (текст)
    */
    
    // this.makeText = function(ms,txt) {
    //     return (setTimeout((ms,txt) => {
    //         return txt;
    //     }, ms));
    // };

    this.filling = function() {
        console.clear();
        this.txt.putSinkD();
        // let message_1 = this.makeText(2000, console.clear());
        let message_1 = setTimeout(() => {
            return console.clear();
        }, 2000);

        // 
        // let message_2 = this.makeText(3000, this.txt.openLid(this.name))
        let message_2 = setTimeout(() => {
            return this.txt.openLid(this.name);
        }, 3000);
        
    };

    this.on = function() {
        clearTimeout(this.filling.message_2);
        console.clear();

        this.count = this.kettle.volume;
        this.message = null;
        this.warning = this.txt.remind(this.name);



        this.waterValue = setInterval(() => {

                this.count += 100;
                this.message = this.txt.gram(this.count, this.warning);

                if(this.count === 1000) {
                    this.message = this.txt.liter(this.warning);
                }

                if(this.count === 1700) {
                    this.message = this.txt.liter_1_7(this.warning);
                }

                if(this.count > 1700) {
                    this.message = this.txt.edge(this.count, this.warning);
                }

                if(this.count >= 2000) {
                    this.message = this.txt.crowded(this.name);
                    this.count = 2000;
                    clearInterval(this.waterValue);
                }

                this.kettle.volume = this.count;

                console.clear();

                this.flowing = setTimeout(() => {
                    this.txt.pours();
                }, 1000);

                console.clear();

                console.log(this.message); 

        }, 2000);


    };


    this.off = function() {
        clearTimeout(this.flowing);
        clearInterval(this.waterValue);
        console.clear();
        this.txt.tapClose(this.kettle.volume);

        let message_3 = setTimeout(() => {
            this.txt.satisfied(this.name);
        }, 3000);

    };

    this.go = function() {
        clearTimeout(this.off.message_3);
        let message_4 = setTimeout(() => {
            console.clear();
            this.txt.close();
        }, 1000);


        let message_5 = setTimeout(() => {
            clearTimeout(message_4);
            console.clear();
            this.txt.putStove(this.name, this.kettle.volume);
        }, 2000);

    };

}

let my_kettle = new New_Kettle('my_kettle');


