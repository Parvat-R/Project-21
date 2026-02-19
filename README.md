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


## Routes
```
Surya
/auth
    /login
    /signup
    /sentotp
    /verifyotp
    /logout


/user
    Agathiya
    / :GET -> return all users
    / :POST -> create a user
    /[id] -> return a user
    /[id]/role :PUT -> changes the role of a user (requires admin access)


/event    
    Roshitha
    / :GET -> returns all events
    / :POST -> create an event
    /[id] :GET -> returns an event
    /[id] :PATCH -> edits an event
    /[id] :DELETE -> deletes

    Surya
    /[id]/changeApproval :PATCH -> modifies the approval (allow only admin)
    /user/[id]
            / :GET -> all events created by a particular user


/register
    Sadha
    / :GET -> returns all registration
    /event/[id]
        / :GET -> returns all the event's registration
        / :POST -> creates a new registration for that event
        / :DELETE -> Deletes the registration
    /[id]
        / :GET -> returs a particular registration
        /attendance :PUT -> make attendance true or flase
    
    /user/[id]
        / :GET -> gets all the events registred by a particular user


Parvat
/eventMod
    / :GET -> returns all the event
    / :POST -> new approval request
    / :PUT -> approve or anything by admin


Mahalakshmi
/admin
    / :GET -> returns all admin


Mahalakshmi
/feedback
    / :GET ->
    / :POST ->
    /event/[id]
    /user/[id]

```