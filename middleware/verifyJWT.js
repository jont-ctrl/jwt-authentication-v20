import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Ta ut Bearer <token>

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    console.log('Decoded:', decoded);

    req.user = decoded;
    next();
  });

  console.log('Körs');
  console.log(req.headers);
}

export default verifyJWT;
