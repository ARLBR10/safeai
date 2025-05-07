# Security - SafeAI Backend
## Designed by Meg with some help o GPT-4o and Gabriel-Hiss

## Why an new plan? (context of the old Authentication.MD)
On the old plan launched by Meg (me) on May 3rd, 2025 we would use to tokens an **refresh token** and a **access token** and after some thinking and digging I found out that this is 2025 and we don't need 2 tokens.

## Ok, so exactly will it work?
On the old authentication plan while writing I realized it was pointless to use a token with a random string to create a JWT it was better create a JWT and use some small tricks to help improve code performance.

For the database i will probably use an **NoSQL** like MongoDB (can be changed if needed later because of the use of Prisma) with an adicional if needed of a Redis cache. The system is similar of how trafic is run for **Non-logging VPN companies** every prompt will be sent using the User table info like Name and Lastname (maybe an Memories table if we created it) and after receiving it we will encrypt using the user Public Key for returning and saving the chats on DB.

You may be asking `Public Key? You will use the RSA method somehow?` and yes for making the use of the platform safe in case of Malware on the User computer or Invasion on one of your services we will encrypt past chats and current ones. The system is simple the user will login as any other company and revice a token **JWT** (with user id, session info, and maybe something more) and after it will be prompted for a **Encryption Password** that will decrypt the use private key saved on your database. If the user is singing up his browser will create the **RSA keys** and sent the Public Key and the Private Key already encrypted.
