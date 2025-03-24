# Overview

Ứng dụng web thương mai điện tử chuyên về kinh doanh các mặt hàng điện tử.

# API Docs

Mục lục:

- [Personal](#api/v1/personal)


## api/v1/personal

### `login-customer`, `login-staff`, `login-admin`

_Phân quyền: `Visitor`_

#### POST

Request:
```json
{
  "email": "text",
  "password": "text"
}
```

Response:
```json
{
  "token": "text"
}
```

### `register-customer`
_Phân quyền: `Visitor`_

#### POST

Request:
```json
{
  "email": "text",
  "password": "text",
  "fullName": "text"
}
```
### `rename`
_Phân quyền: `Customer`, `Staff`, `Admin`_

#### POST

Request:
```json
{
  "fullName": "text"
}
```

### `change-password`
_Phân quyền: `Customer`, `Staff`, `Admin`_

#### POST

Request:
```json
{
  "oldPassword": "text",
  "newPassword": "text"
}
```

## api/v1/users
