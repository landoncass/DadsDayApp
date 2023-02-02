TRUNCATE TABLE "DaysOut", "Reviews" RESTART IDENTITY;

INSERT INTO "DaysOut" ("Location", "Date", "Description", "User") VALUES ('St. Pete Pier', '11-22-2022', 'Margot and I had a blast. I pulled her around on her wagon for a bit. The playground had a lot of bigger kids and it was pretty crowded. It will probably be more fun when she is older', 'Tony B.');
INSERT INTO "DaysOut" ("Location", "Date", "Description", "User") VALUES ('SkyZone', '12/2/2022', 'Benny really liked jumping on the trampoline with the ball. I hurt my knee, but we will probably go back again once I heal', 'Gary M.');
INSERT INTO "DaysOut" ("Location", "Date", "Description", "User") VALUES ('Azalea Park', '1/3/2023', 'My son and I had a great time at the park. He really enjoyed the pirate ship and the slide. There were a lot of fun things to try, and kept him busy.', 'Jeff W.');
INSERT INTO "DaysOut" ("Location", "Date", "Description", "User") VALUES ('West St. Pete Library', '1/10/2023', 'This library was pretty good. It had a section for kids. My daughter picked out some books and she had fun being as quiet as possible', 'Tom D.');

INSERT INTO "Reviews" ("DayOutId", "CreatedAt", "Summary", "Body", "Stars") VALUES (1, '2023-01-01 14:00:00', 'It was okay', 'We had an okay time. I might go back another day. But I have been to better places', 3);
INSERT INTO "Reviews" ("DayOutId", "CreatedAt", "Summary", "Body", "Stars") VALUES (1, '2023-02-01 14:00:00', 'It was great', 'We had an great time. I will go back another day. I have never been to a better places', 4);