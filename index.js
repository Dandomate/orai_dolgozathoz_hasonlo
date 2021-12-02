const mysql = require('mysql');
//const http = require('http');

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    database: "eladasok",
    user: "Mate",
    password: "mate"
});


connection.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected");
    console.log("Lekérdezés");
    const myQuery = "SELECT partner_neve FROM `eladas` order by partner_neve;";
    connection.query(myQuery, (err, result, fields) => {
        if (err) throw err;

        //console.log(result);
        //console.log(JSON.stringify(result));
        console.log('-----------------------------');
        const sorok = JSON.parse(JSON.stringify(result));
        //console.log(sorok);
        for (sor of sorok) {
            console.log(`Név:  ${sor.partner_neve}`);
        }
    
    });
    const myQuery1 = "SELECT SUM(ertek) AS ertek1 FROM `eladas` where ertek > 0;";
    connection.query(myQuery1, (err, result, fields) => {
        if (err) throw err;

        //console.log(result);
        //console.log(JSON.stringify(result));
        console.log('-----------------------------');
        const sorok = JSON.parse(JSON.stringify(result));
        //console.log(sorok);
        for (sor of sorok) {
            console.log(`Bevétel:  ${sor.ertek1}`);
        }
    
    });
    const myQuery3 = "SELECT SUM(ertek*-1) AS ertek1 FROM `eladas` where ertek < 0;";
    connection.query(myQuery3, (err, result, fields) => {
        if (err) throw err;

        //console.log(result);
        //console.log(JSON.stringify(result));
        console.log('-----------------------------');
        const sorok = JSON.parse(JSON.stringify(result));
        //console.log(sorok);
        for (sor of sorok) {
            console.log(`Kiadás:  ${sor.ertek1}`);
        }
    
    });
    const myQuery2 = "SELECT datum FROM `eladas` group by ertek DESC;";
    connection.query(myQuery2, (err, result, fields) => {
        if (err) throw err;

        //console.log(result);
        //console.log(JSON.stringify(result));
        console.log('-----------------------------');
        const sorok = JSON.parse(JSON.stringify(result));
        //console.log(sorok);
        for (sor of sorok) {
            console.log(`Dátum:  ${sor.datum}`);
        }
    
    });
    console.log("Adatbeszúrás");
    const myInsert = "INSERT INTO `eladas`(`datum`, `ertek`, `partner_neve`) VALUES ('2021.12.20','2500','András');";
    connection.query( myInsert, (err, result) =>{
        if (err) throw err;
        console.log(`Beszúrva: ${result.affectedRows} sor`);
    });
    console.log("Adat módosítás");
    const myUpdate = "UPDATE `eladas` SET `ertek`='6000' WHERE partner_neve='Tóth Amália'";
    connection.query( myUpdate, (err, result) =>{
        if (err) throw err;
        console.log(`Módosítva: ${result.affectedRows} sor`);
    });
    console.log("Adat törlés");
    const myDelete = "DELETE FROM `eladas` WHERE ertek = 0;";
    connection.query( myDelete, (err, result) =>{
        if (err) throw err;
        console.log(`Törölve: ${result.affectedRows} sor`);
    });
    connection.end();

});

    


