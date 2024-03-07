import type { NextApiRequest, NextApiResponse } from 'next';
import { google, calendar_v3 } from 'googleapis';

// This API route is responsible for creating a new calendar event
// on the user's Google Calendar using the provided access token

// Define a type for the expected request body
type RequestBody = {
  accessToken: string;
  event: calendar_v3.Schema$Event;
};

// This function will be called when the API route receives a POST request
// It expects the request body to contain an access token and a calendar event
// It will attempt to create the event on the user's Google Calendar
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }
  // Destructure the access token and event from the request body
  const { accessToken, event }: RequestBody = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' });
  }
  // If the event is missing required fields, respond with an error
  try {
    // Initialize the Google OAuth2 client with TypeScript annotations
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Create a Google Calendar API instance
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Attempt to create the calendar event
    const createdEvent = await calendar.events.insert({
      calendarId: 'primary', // You can specify a different calendar ID if necessary
      requestBody: event, // The event object should be structured according to Google Calendar API expectations
    });

    // Respond with the created event details
    return res.status(200).json(createdEvent.data);
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return res.status(500).json({ error: 'Failed to create calendar event' });
  }
}