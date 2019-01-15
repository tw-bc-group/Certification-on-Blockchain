Proxy app API
===
## get certification by mobile number
```
GET /certifications/{mobileNumber}
```
Example
```
/certifications/+86 123456789

{ certificationType: 'TW',
  subject: 'agile coach',
  awardDate: 'agile coach',
  expiredDate: '1/12/2020',
  partner: 'some partner' }
```

## get winner by mobile number
```
GET /winners/{mobileNumber}
```
Example
```
/winners/+86 123456789

{ firstName: 'John',
  lastName: 'William',
  mobileNumber: '0x2b38362031323334353637383900000000000000000000000000000000000000' }
```
