import React, { Component } from "react";
import * as firebase from 'firebase/app';
import 'firebase/auth';

fireabse.auth().signInWithEmailAndPassword("user@yourjha.com","adminadmin").then((token) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(token);
  })

// admin.auth().createUser({
//     email: 'user@yourjha.com',
//     emailVerified: false,
//     phoneNumber: '+11234567890',
//     password: 'adminadmin',
//     displayName: 'John Doe',
//     photoURL: 'http://www.example.com/12345678/photo.png',
//     disabled: false,
//   })
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log('Successfully created new user:', userRecord.uid, userRecord);
//   })
//   .catch((error) => {
//     console.log('Error creating new user:', error);
//   });