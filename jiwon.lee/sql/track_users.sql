CREATE TABLE IF NOT EXISTS `track_users` (
`id` INT NULL,
`name` VARCHAR(MAX) NULL,
`username` VARCHAR(MAX) NULL,
`email` VARCHAR(MAX) NULL,
`password` VARCHAR(MAX) NULL,
`date_create` VARCHAR(MAX) NULL,
`loacation` VARCHAR(MAX) NULL,
`img` VARCHAR(MAX) NULL
);

INSERT INTO track_users VALUES
(1,'Ruby Gentry','user1','user1@gmail.com',md5('pass'),'2020-06-19 09:17:42','Mahtowa\, Alabama','https://via.placeholder.com/400/963/fff/?text=user1'),
(2,'Mccall Armstrong','user2','user2@gmail.com',md5('pass'),'2020-08-21 03:22:50','Richmond\, New Jersey','https://via.placeholder.com/400/855/fff/?text=user2'),
(3,'Wynn Erickson','user3','user3@gmail.com',md5('pass'),'2020-01-23 10:49:06','Dupuyer\, American Samoa','https://via.placeholder.com/400/975/fff/?text=user3'),
(4,'Nadine Jacobs','user4','user4@gmail.com',md5('pass'),'2020-10-10 11:51:35','Bedias\, Kansas','https://via.placeholder.com/400/748/fff/?text=user4'),
(5,'Knapp Bond','user5','user5@gmail.com',md5('pass'),'2020-01-25 02:35:23','Fredericktown\, North Dakota','https://via.placeholder.com/400/707/fff/?text=user5'),
(6,'Staci Mooney','user6','user6@gmail.com',md5('pass'),'2020-01-30 04:49:37','Munjor\, Puerto Rico','https://via.placeholder.com/400/789/fff/?text=user6'),
(7,'Kemp Norris','user7','user7@gmail.com',md5('pass'),'2020-03-09 07:49:12','Nogal\, North Carolina','https://via.placeholder.com/400/876/fff/?text=user7'),
(8,'Greta Douglas','user8','user8@gmail.com',md5('pass'),'2020-04-10 09:25:28','Summerfield\, Minnesota','https://via.placeholder.com/400/987/fff/?text=user8'),
(9,'Phoebe Aguirre','user9','user9@gmail.com',md5('pass'),'2020-04-15 02:48:02','Clay\, Arkansas','https://via.placeholder.com/400/801/fff/?text=user9'),
(10,'Bruce Pacheco','user10','user10@gmail.com',md5('pass'),'2020-01-01 03:18:26','Waukeenah\, Virgin Islands','https://via.placeholder.com/400/855/fff/?text=user10');