<<<<<<< HEAD
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';

const events = [
  {
    id: 3,
    title: 'Happy FoxHackathon 2025',
    date: new Date(2025, 2, 24),
    time: '09:00 - 21:00',
    location: 'Rajalakshmi Engineering College',
    type: 'Competition',
    url: 'https://example.com/hackathon2025',
  },
  {
    id: 1,
    title: 'Tech Workshop: Advanced React Patterns',
    date: new Date(2025, 2, 25),
    time: '14:00 - 16:00',  
    location: 'Virtual',
    type: 'Workshop',
    url: 'https://meet.google.com/dvm-xpvp-chn',
  },



  {
    id: 2,
    title: 'Alumni Networking Night',
    date: new Date(2025, 2, 25),
    time: '18:00 - 20:00',
    location: 'Main Auditorium',
    type: 'Networking',
    url: 'https://example.com/networking',
  },

  {
    id: 3,
    title: 'Happy FoxHackathon 2025',
    date: new Date(2025, 2, 24),
    time: '09:00 - 21:00',
    location: 'Rajalakshmi Engineering College',
    type: 'Competition',
    url: 'https://example.com/hackathon2025',
  },{
    id: 4,
    title: 'Revotronics- Revothon',
    date: new Date(2025, 2, 27),
    time: '09:00 - 21:00',
    location: 'Rajalakshmi Engineering College',
    type: 'Competition',
    url: 'https://revotronics2025.tech/events/revotron'
  },{
    id: 5,
    title: 'Revotronics - PaperPresentation',
    date: new Date(2025, 7, 1),
    time: '09:00 - 21:00',
    location: 'Rajalakshmi Engineering College',
    type: 'Competition',
    url: 'https://revotronics2025.tech/events/paperpres'
  },{
    id: 6,
    title: 'SIH 2025',
    date: new Date(2025, 8, 1),
    time: '09:00 - 21:00',
    location: 'Rajalakshmi Engineering College',
    type: 'Competition',
    url: 'sih.gov.in'
  },
  {
    id: 7,
    title: 'Hackathon 2025',
    date: new Date(2024, 8, 1),
    time: '09:00 - 21:00',
    location: 'Rajalakshmi Engineering College',
    type: 'Competition',
    url: 'https://example.com/hackathon2024',
  },
];

export function EventsCalendar() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
=======
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Clock, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'internal' | 'external';
  organizer: string;
  interests: string[];
  registration_url: string;
}

export function EventsCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    interest: 'all'
  });
  const [userInterests, setUserInterests] = useState<string[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      // Fetch current user's interests
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('interests')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUserInterests(profile.interests);
        }
      }

      // Fetch events
      let query = supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString());

      if (filters.type !== 'all') {
        query = query.eq('type', filters.type);
      }

      if (filters.interest !== 'all') {
        query = query.contains('interests', [filters.interest]);
      }

      const { data } = await query;
      if (data) setEvents(data);
    }

    fetchEvents();
  }, [filters]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        
        <div className="flex gap-4">
          <select
            className="px-4 py-2 rounded-lg border"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="all">All Locations</option>
            <option value="internal">Inside College</option>
            <option value="external">Outside College</option>
          </select>

          <select
            className="px-4 py-2 rounded-lg border"
            value={filters.interest}
            onChange={(e) => setFilters({ ...filters, interest: e.target.value })}
          >
            <option value="all">All Interests</option>
            {userInterests.map((interest) => (
              <option key={interest} value={interest}>{interest}</option>
            ))}
          </select>
        </div>
      </div>
>>>>>>> 85541e8 (p2)
      
      <div className="grid gap-6">
        {events.map((event) => (
          <div
            key={event.id}
<<<<<<< HEAD
            className="bg-white rounded-xl shadow-sm p-6 flex items-start gap-6"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex flex-col items-center justify-center text-primary">
              <CalendarIcon className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">
                {format(event.date, 'MMM d')}
              </span>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {event.location}
                </div>
              </div>
            </div>
            
            <button 
              className="bg-primary text-white px-4 py-2 rounded-lg"
              onClick={() => window.open(event.url, '_blank')}
            >
              Register
            </button>
=======
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex flex-col items-center justify-center text-primary">
                  <CalendarIcon className="w-6 h-6 mb-1" />
                  <span className="text-sm font-medium">
                    {format(new Date(event.date), 'MMM d')}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-gray-600 mt-1">{event.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      event.type === 'internal' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {event.type === 'internal' ? 'Inside College' : 'Outside College'}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="text-primary">
                      Organized by {event.organizer}
                    </div>
                  </div>
                </div>
                
                <button 
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  onClick={() => window.open(event.registration_url, '_blank')}
                >
                  Register
                </button>
              </div>
            </div>
>>>>>>> 85541e8 (p2)
          </div>
        ))}
      </div>
    </div>
  );
}