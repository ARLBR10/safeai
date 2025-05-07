# Authentication - SafeAI Backend
## Designed with help of the GPT and the Internet
 
# Authentication flow
Access Token (JWT, short‑lived) 
Refresh Token (opaque, long‑lived)

## JWT - Access token
> Json Web Tokens (JWTs) are pretty good where we can validade an authentication without needing to check database every freaking time to validade a request. they are also pretty good in terms of bring back and forth some data like the UserID and stuff.
> The biggest downside is that if your code is leaked the person will be able to create any token. And if you want to expire a token you would need a freaking shitbox of logic or check the database every time which would make the JWT useless as you need to open the database every time.

In your project we will use JWT as access token that expires every 10/15 minutes and with all the good things of it.

## Opaque - Refresh token
> Opaque tokens are a random string of characters 

We will use then every time the *Access Token* (JWT) expires. It **WILL** check the database every time but as it wont be used that often we are fine.

Every time the JWT expires the FrontEnd will hit the back with an request like `/auth/refresh` where the `Authorization` header will be the Refresh Token and get back a brand new JWT token. 

## Downsides
If the user exits the site today and enter it back tomorrow will need to make sure that the browser hits the **Refresh** endpoint every time otherwise he will need to login again which would a PAIN in the ass.

If the user click `Logout in All devices` it would take the Refresh Token expiry time to fully logout.

### Some problems?

The authentication flow would be fine like this but we want to encrypt all past chats. Carrying the password in plaintext every request would be a MAJOR security flaw because the chat would be safe but if someone has a Trojan a like at the user computer it could intercept and defeat the meaning of an encrypted chat. One way would be to use the **RSA Algorithm** where we would encrypt the Private key with the user password and save a public key and in every request sent it encrypted including what we would store in the chat.

### How could we fix some of this?

Every request would hit the database for cases like if the is enough funds for a user so why care with Refresh and Access tokens. 

If we still used this flow and hit the database anyways a good way to fix the expiry token when logout would be to create a "FAKE" user id and it would be unique and every time a `Logout in All devices` happened we would change that and when we would check the funds it would be invalid and an `401 Unauthorized` was shot it would logout in every device. But again we are reading the database anyways so WHY have a so complicated thing.

#### Thinking a little more
Every request removing Global Configuration ones could send a new JWT token with information like the funds but if the guy did a **Credit Card fraud** and we didn't checked the database the mtf would use the thing for FREE.

This wouldn't be a problem in case of a SelfHosted environment or if the guy put it own API Keys for systems like `OpenRouter` or `Claude`