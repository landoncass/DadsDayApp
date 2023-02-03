TRUNCATE TABLE "DaysOut", "Reviews" RESTART IDENTITY;

INSERT INTO "DaysOut" ("Location", "Date", "Description") VALUES ('St. Pete Pier', 'St. Petersburg, FL', 'The St. Petersburg Pier, officially known as the St. Pete Pier, is a landmark pleasure pier extending into Tampa Bay from downtown St. Petersburg, Florida.');
INSERT INTO "DaysOut" ("Location", "Date", "Description") VALUES ('Sky Zone Trampoline Park', 'Largo, FL', 'Chain of indoor trampoline parks featuring freestyle bouncing, dodgeball, fitness programs & more.');
INSERT INTO "DaysOut" ("Location", "Date", "Description") VALUES ('Azalea Park', 'St. Petersburg, FL', 'This is one of the public parks in the city. It has a playground for kids to play and fields for sports');
INSERT INTO "DaysOut" ("Location", "Date", "Description") VALUES ('West St. Pete Library', 'St. Petersburg, FL', 'This is a public library part of the St. Petersburg Library system. It is located at St. Petersburg College Gibbs Campus');

INSERT INTO "Reviews" ("DayOutId", "CreatedAt", "Summary", "Body", "Stars") VALUES (1, '2023-01-01 14:00:00', 'It was okay', 'We had an okay time. I might go back another day. But I have been to better places', 3);
INSERT INTO "Reviews" ("DayOutId", "CreatedAt", "Summary", "Body", "Stars") VALUES (1, '2023-02-01 14:00:00', 'It was great', 'We had an great time. I will go back another day. I have never been to a better places', 4);