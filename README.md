# Keycloak Single Sign-On (SSO) Process DocumentationKeycloak

This document outlines the steps to obtain an access token from Keycloak using the Authorization Code Flow.

## Step-by-Step Guide to Obtain an Access Token

### Step 1: Get the Authorization URL

To begin the authentication process, you need to construct the authorization URL. This URL should include the following query parameters:

* `response_type=code`
* `client_id=your-client-id`
* `redirect_uri=your-redirect-uri`

###### Example authorization URL:

```
https://your-keycloak-server/auth/realms/your-realm/protocol/openid-connect/auth?response_type=code&client_id=your-client-id&redirect_uri=your-redirect-uri
```

### Step 2: User Authentication

When the user accesses the authorization URL, they will be prompted to enter their username and password. If the credentials are valid, Keycloak will redirect the user to the specified callback URL with an authorization code.

### Step 3: Retrieve the Authorization Code

The authorization code will be included as a query parameter in the callback URL.

###### Example:

```
https://your-redirect-uri?code=authorization-code
```

Extract the `code` parameter from the URL.

### Step 4: Exchange Authorization Code for Access Token

Make a POST request to the token endpoint to exchange the authorization code for an access token. The token endpoint URL is:

```http://localhost:8080/realms/master/protocol/openid-connect/token
http://localhost:8080/realms/master/protocol/openid-connect/token
```

The POST request should include the following parameters in the body:

* `code=authorization-code`
* `grant_type=authorization_code`
* `redirect_uri=your-redirect-uri`
* `client_id=your-client-id`
* `client_secret=your-client-secret` (if applicable)

Example request using `curl`:

```curl
--url http://localhost:8080/realms/master/protocol/openid-connect/token 
--header 'Content-Type: application/x-www-form-urlencoded' 
--data 'code=authorization-code' 
--data 'grant_type=authorization_code' 
--data 'redirect_uri=your-redirect-uri' 
--data 'client_id=your-client-id' 
--data 'client_secret=your-client-secret'
```

Step 5: Receive the Access Token

If the request is successful, the response will include the access token and other related data.

Example response:

```
{
  "access_token": "your-access-token",
  "expires_in": 300,
  "refresh_token": "your-refresh-token",
  "refresh_expires_in": 1800,
  "token_type": "Bearer",
  "not-before-policy": 0,
  "session_state": "session-state-id",
  "scope": "openid profile"
}
```

You can now use the `access_token` to authenticate API requests.
