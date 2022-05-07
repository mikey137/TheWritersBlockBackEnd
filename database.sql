CREATE DATABASE jwttutorial

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
)

CREATE TABLE story_info (
	story_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
	user_id uuid,
	story_text VARCHAR(5000) NOT NULL,
	story_title VARCHAR(50) NOT NULL,
	views INTEGER NOT NULL,
	likes INTEGER NOT NULL,
	dated_created TIMESTAMP NOT NULL,
	FOREIGN KEY (user_id)
		REFERENCES users (user_id)
)