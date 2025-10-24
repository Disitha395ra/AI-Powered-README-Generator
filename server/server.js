import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import openAI from 'openai';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());