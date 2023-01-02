CREATE TABLE Kanal(
    ID_kanala int NOT NULL PRIMARY KEY,
    name varchar(15) NOT NULL,
    password varchar(20) NOT NULL
);
INSERT into Kanal(ID_kanala,name,password) VALUES
(1,'Nikola 24','24122004'),
(2,'Nikola 42','12345678')
CREATE TABLE Video (
    ID_video int NOT NULL PRIMARY KEY,
    ID_kanala int NOT NULL,
    ime varchar(255) NOT NULL,
    datum DATETIME,
    FOREIGN KEY (ID_kanala) REFERENCES Kanal(ID_kanala)
);


INSERT into Video (ID_video,ID_kanala,ime,datum) VALUES
(1,1,'dsadsadg asuydgsadf dsadasd dsahdasd','2023-1-2 11:10:10'),
(2,1,'dsadsadg','2023-1-2 11:10:10'),
(3,1,'dsadsadg  dsadasd ','2023-1-2 11:10:10'),
(4,1,'dsadsadg asuydgsadf  dsahdasd','2023-1-2 11:10:10'),
(5,1,'dsadsadg  dsadasd ','2023-1-2 11:10:10'),
(6,2,'dsadsadg  dsadasd ','2023-1-2 11:10:15')