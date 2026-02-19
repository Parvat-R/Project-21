# Project 21

## Models:
```
User
- id
- name
- email
- password
- role
- dateofjoin
- walletBalance

Event
- id
- creatorId FK
- slug UNIQUE
- title
- description
- approvalStatus
- createdOn
- start-datetime
- end-datetime
- image-data
- seats
- amount
- visibility (internal / public)

Registration
- id
- userId FK
- eventId FK
- registeredTime
- attendance
- attendanceTime

Payment
- id
- userId
- paymentId
- regestrationId
- eventId
- status
- amount

OtpVerification
- otp
- email

Feedback
- id
- registrationId
- description
- stars

EventMod
- id
- eventId
- status
- comments
- appliedOn
- responseOn
- followUpId
```