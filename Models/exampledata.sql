TRUNCATE TABLE "DaysOut", "Reviews", "Users" RESTART IDENTITY;

INSERT INTO "Users" ("FullName", "Email", "HashedPassword") VALUES ('Joe', 'joe@joe.com', 'xxxxx');
INSERT INTO "Users" ("FullName", "Email", "HashedPassword") VALUES ('Bob', 'bob@bob.com', 'xxxxx');

INSERT INTO "DaysOut" ("Location", "Address", "Description", "Latitude", "Longitude", "UserId") VALUES ('St. Pete Pier', '600 2nd Ave NE, St. Petersburg, FL 33701', 'The St. Petersburg Pier, officially known as the St. Pete Pier, is a landmark pleasure pier extending into Tampa Bay from downtown St. Petersburg, Florida.',27.773773845882573, -82.63141895901559, 2);
INSERT INTO "DaysOut" ("Location", "Address", "Description", "Latitude", "Longitude", "UserId") VALUES ('Sky Zone Trampoline Park', '13000 66th St N, Largo, FL 33773', 'Chain of indoor trampoline parks featuring freestyle bouncing, dodgeball, fitness programs & more.',27.890824208520215, -82.73035058374964, 1);
INSERT INTO "DaysOut" ("Location", "Address", "Description","Latitude", "Longitude", "UserId") VALUES ('Azalea Park', '1600 72nd St N, St. Petersburg, FL 33713', 'This is one of the public parks in the city. It has a playground for kids to play and fields for sports',27.7876990469894, -82.73980900312652, 2);
INSERT INTO "DaysOut" ("Location", "Address", "Description", "Latitude", "Longitude", "UserId") VALUES ('West St. Pete Library', '6700 8th Ave N, St. Petersburg, FL 33710', 'This is a public library part of the St. Petersburg Library system. It is located at St. Petersburg College Gibbs Campus',27.77927011462087, -82.73150814994497, 1);

INSERT INTO "Reviews" ("DayOutId", "CreatedAt", "Summary", "Body", "Stars", "UserId") VALUES (1, '2023-01-01 14:00:00', 'It was okay', 'We had an okay time. I might go back another day. But I have been to better places', 3,  2);
INSERT INTO "Reviews" ("DayOutId", "CreatedAt", "Summary", "Body", "Stars", "UserId") VALUES (1, '2023-02-01 14:00:00', 'It was great', 'We had an great time. I will go back another day. I have never been to a better places', 4, 1);