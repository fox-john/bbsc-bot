CREATE TABLE discord.users (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY(id),
	createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE discord.groups (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY(id),
	createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE discord.permissions (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY(id),
	createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE discord.users_groups (
	userid INT NOT NULL,
	groupid INT NOT NULL,
	createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
	CONSTRAINT pk_users_groups PRIMARY KEY clustered (userid, groupid),
  CONSTRAINT fk_users_groups_userid FOREIGN KEY (userid) REFERENCES users(id),
  CONSTRAINT fk_users_groups_groupid FOREIGN KEY (groupid) REFERENCES groups(id)
);

CREATE TABLE discord.users_permissions (
	userid INT NOT NULL,
	permissionid INT NOT NULL,
	createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
	CONSTRAINT pk_users_permissions PRIMARY KEY clustered (userid, permissionid),
  CONSTRAINT fk_users_permissions_userid FOREIGN KEY (userid) REFERENCES users(id),
  CONSTRAINT fk_users_permissions_permissionid FOREIGN KEY (permissionid) REFERENCES permissions(id)
);

CREATE TABLE discord.groups_permissions (
	groupid INT NOT NULL,
	permissionid INT NOT NULL,
	createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
	CONSTRAINT pk_groups_permissions PRIMARY KEY clustered (groupid, permissionid),
  CONSTRAINT fk_groups_permissions_groupid FOREIGN KEY (groupid) REFERENCES groups(id),
  CONSTRAINT fk_groups_permissions_permissionid FOREIGN KEY (permissionid) REFERENCES permissions(id)
);
