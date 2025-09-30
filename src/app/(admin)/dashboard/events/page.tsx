'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Table } from '@/components/admin/Table';
import { Search, Plus, Edit, Trash2, Eye, Calendar, Clock, MapPin, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Event } from '@/types/event';

interface EventsResponse {
  events: Event[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState<'start_date' | 'title'>('start_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, [currentPage, searchTerm, sortBy, sortOrder, statusFilter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/events?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data: EventsResponse = await response.json();

      // Filter and sort events on client side
      let filteredEvents = [...data.events];

      // Apply status filter
      if (statusFilter !== 'all') {
        filteredEvents = filteredEvents.filter(event => {
          const status = getEventStatus(event).status;
          return status === statusFilter;
        });
      }

      // Sort events
      const sortedEvents = filteredEvents.sort((a, b) => {
        let aValue: string | Date;
        let bValue: string | Date;

        if (sortBy === 'start_date') {
          aValue = new Date(a.start_date);
          bValue = new Date(b.start_date);
        } else {
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
        }

        if (sortOrder === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });

      setEvents(sortedEvents);
      setTotalPages(data.pagination.totalPages);
      setTotalCount(data.pagination.total);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDelete = async (event: Event) => {
    if (!event?.id || !event?.title) {
      alert('Invalid event data');
      return;
    }

    const confirmMessage = `Are you sure you want to delete "${event.title}"?\n\nThis action cannot be undone.`;
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete event');
      }

      await fetchEvents();
      alert('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert(`Failed to delete event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getEventStatus = (event: Event) => {
    if (!event?.start_date) {
      return { status: 'unknown', color: 'gray', text: 'Unknown' };
    }

    const now = new Date();
    const startDate = new Date(event.start_date);
    const endDate = event.end_date ? new Date(event.end_date) : startDate;

    if (now < startDate) {
      return { status: 'upcoming', color: 'blue', text: 'Upcoming' };
    } else if (now > endDate) {
      return { status: 'completed', color: 'gray', text: 'Completed' };
    } else {
      return { status: 'ongoing', color: 'green', text: 'Ongoing' };
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (event: Event) => {
        if (!event) {
          return (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          );
        }

        // Get primary image or first image from multiple images, fallback to single image_url
        const primaryImage = event.images?.find(img => img.is_primary)?.url ||
                            event.images?.[0]?.url ||
                            event.image_url;

        return (
          <div className="flex items-center justify-center">
            {primaryImage ? (
              <div className="relative">
                <img
                  src={primaryImage}
                  alt={event.title || 'Event image'}
                  className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200"
                />
                {/* Show count if multiple images */}
                {event.images && event.images.length > 1 && (
                  <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {event.images.length}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'title',
      label: 'Event',
      render: (event: Event) => {
        if (!event) {
          return (
            <div>
              <div className="font-semibold text-gray-400">Loading...</div>
              <div className="text-sm text-gray-400 mt-1">Please wait...</div>
            </div>
          );
        }

        return (
          <div>
            <div className="font-semibold text-gray-900 line-clamp-2">{event.title || 'Untitled Event'}</div>
            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
              {event.description || 'No description available'}
            </div>
          </div>
        );
      },
    },
    {
      key: 'dates',
      label: 'Date & Time',
      render: (event: Event) => {
        if (!event || !event.start_date) {
          return (
            <div className="text-sm text-gray-400">
              <div className="flex items-center mb-1">
                <Calendar className="h-3 w-3 mr-1" />
                No date available
              </div>
            </div>
          );
        }

        try {
          return (
            <div className="text-sm">
              <div className="flex items-center text-gray-900 mb-1">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(event.start_date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              {event.end_date && event.end_date !== event.start_date && (
                <div className="text-gray-500 text-xs mt-1">
                  to {new Date(event.end_date).toLocaleDateString()}
                </div>
              )}
            </div>
          );
        } catch (error) {
          return (
            <div className="text-sm text-red-500">
              <div className="flex items-center mb-1">
                <Calendar className="h-3 w-3 mr-1" />
                Invalid date
              </div>
            </div>
          );
        }
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (event: Event) => {
        if (!event) return <span className="text-gray-400">N/A</span>;
        const { status, color, text } = getEventStatus(event);
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${color === 'blue' ? 'bg-blue-100 text-blue-800' :
              color === 'green' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'}`}>
            {text}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (event: Event) => (
        <div className="flex items-center space-x-2">
          {event?.id ? (
            <>
              <Link href={`/dashboard/events/${event.id}`}>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/dashboard/events/${event.id}/edit`}>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(event)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <span className="text-gray-400 text-sm">No actions</span>
          )}
        </div>
      ),
    },
  ];

  const upcomingEvents = events.filter(event => event && getEventStatus(event).status === 'upcoming').length;
  const ongoingEvents = events.filter(event => event && getEventStatus(event).status === 'ongoing').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">
            Manage school events and activities
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/dashboard/events/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingEvents}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ongoing</p>
              <p className="text-2xl font-bold text-gray-900">{ongoingEvents}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Search className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Search Results</p>
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 w-full">
              <Input
                placeholder="Search events by title or description..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="flex space-x-2">
              <Link href="/dashboard/events/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Event
                </Button>
              </Link>
              <Button variant="outline" onClick={fetchEvents}>
                Refresh
              </Button>
            </div>
          </div>

          {/* Filters and Sorting Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4 border-t border-gray-200">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div className="flex space-x-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'upcoming' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('upcoming')}
                >
                  Upcoming
                </Button>
                <Button
                  variant={statusFilter === 'ongoing' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('ongoing')}
                >
                  Ongoing
                </Button>
                <Button
                  variant={statusFilter === 'completed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('completed')}
                >
                  Completed
                </Button>
              </div>
            </div>

            {/* Sorting Controls */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <div className="flex space-x-2">
                <Button
                  variant={sortBy === 'start_date' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('start_date')}
                >
                  Date
                </Button>
                <Button
                  variant={sortBy === 'title' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('title')}
                >
                  Title
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center"
              >
                {sortOrder === 'asc' ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Events Table */}
      <Card>
        <Table
          data={events}
          columns={columns}
          loading={loading}
          emptyMessage="No events found"
        />
      </Card>
    </div>
  );
}
