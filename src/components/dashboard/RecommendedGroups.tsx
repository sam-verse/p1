<<<<<<< HEAD
import React from 'react';
import { Users } from 'lucide-react';

const groups = [
  {
    id: 1,
    name: 'Web Development',
    members: 128,
    description: 'Learn and collaborate on web development projects',
  },
  {
    id: 2,
    name: 'AI/ML Enthusiasts',
    members: 95,
    description: 'Explore artificial intelligence and machine learning',
  },
  {
    id: 3,
    name: 'Competitive Programming',
    members: 156,
    description: 'Practice algorithmic problem solving',
  },
];

export function RecommendedGroups() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Recommended Groups</h2>
      <div className="space-y-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{group.name}</h3>
              <div className="flex items-center text-gray-600 text-sm">
                <Users className="w-4 h-4 mr-1" />
                {group.members}
              </div>
            </div>
            <p className="text-gray-600 text-sm">{group.description}</p>
          </div>
        ))}
=======
import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Profile {
  id: string;
  full_name: string;
  department: string;
  interests: string[];
}

interface Alumni {
  id: string;
  full_name: string;
  department: string;
  company: string;
  role: string;
  interests: string[];
  image_url: string;
  linkedin_url: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
}

export function RecommendedGroups() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [recommendedGroups, setRecommendedGroups] = useState<Group[]>([]);
  const [recommendedAlumni, setRecommendedAlumni] = useState<Alumni[]>([]);
  const [recommendedPeers, setRecommendedPeers] = useState<Profile[]>([]);

  useEffect(() => {
    async function fetchUserAndRecommendations() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch current user's profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setCurrentUser(profile);

        // Fetch recommended alumni based on department and interests
        const { data: alumni } = await supabase
          .from('alumni')
          .select('*')
          .eq('department', profile.department)
          .overlaps('interests', profile.interests)
          .limit(3);

        if (alumni) setRecommendedAlumni(alumni);

        // Fetch recommended peers based on department and interests
        const { data: peers } = await supabase
          .from('profiles')
          .select('*')
          .eq('department', profile.department)
          .neq('id', user.id)
          .overlaps('interests', profile.interests)
          .limit(3);

        if (peers) setRecommendedPeers(peers);

        // Fetch recommended groups based on interests
        const { data: groups } = await supabase
          .from('groups')
          .select('*')
          .limit(3);

        if (groups) setRecommendedGroups(groups);
      }
    }

    fetchUserAndRecommendations();
  }, []);

  return (
    <div className="space-y-8">
      {/* Recommended Groups */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recommended Groups</h2>
        <div className="space-y-4">
          {recommendedGroups.map((group) => (
            <div
              key={group.id}
              className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{group.name}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {group.members}
                </div>
              </div>
              <p className="text-gray-600 text-sm">{group.description}</p>
              <button className="mt-3 text-primary hover:text-primary-dark font-medium">
                Join Group
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Alumni */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Connect with Alumni</h2>
        <div className="grid gap-4">
          {recommendedAlumni.map((alumni) => (
            <div key={alumni.id} className="flex items-center gap-4 border rounded-lg p-4">
              <img
                src={alumni.image_url}
                alt={alumni.full_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{alumni.full_name}</h3>
                <p className="text-sm text-gray-600">{alumni.role} at {alumni.company}</p>
              </div>
              <a
                href={alumni.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark font-medium"
              >
                Connect
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Peers */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Connect with Peers</h2>
        <div className="grid gap-4">
          {recommendedPeers.map((peer) => (
            <div key={peer.id} className="flex items-center gap-4 border rounded-lg p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {peer.full_name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{peer.full_name}</h3>
                <p className="text-sm text-gray-600">{peer.department}</p>
              </div>
              <button className="text-primary hover:text-primary-dark font-medium">
                Connect
              </button>
            </div>
          ))}
        </div>
>>>>>>> 85541e8 (p2)
      </div>
    </div>
  );
}