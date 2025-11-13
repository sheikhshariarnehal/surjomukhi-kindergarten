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
      key: 'image_column',
      label: 'Image',
      render: (value: any, event: Event) => {
        if (!event) {
          return (
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center">
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
              <div className="relative group">
                <img
                  src={primaryImage}
                  alt={event.title || 'Event image'}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200 group-hover:border-primary-400 transition-all"
                />
                {/* Show count if multiple images */}
                {event.images && event.images.length > 1 && (
                  <div className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    {event.images.length}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md">
                <Calendar className="h-7 w-7 text-white" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'title',
      label: 'Event Details',
      render: (value: any, event: Event) => {
        if (!event) {
          return (
            <div className="py-2">
              <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-64 bg-gray-100 rounded mt-2 animate-pulse"></div>
            </div>
          );
        }

        return (
          <div className="py-2 max-w-md">
            <div className="font-semibold text-gray-900 line-clamp-1 text-base">{event.title || 'Untitled Event'}</div>
            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
              {event.description || 'No description available'}
            </div>
          </div>
        );
      },
    },
    {
      key: 'start_date',
      label: 'Schedule',
      render: (value: any, event: Event) => {
        if (!event || !event.start_date) {
          return (
            <div className="text-sm text-gray-400 py-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                No date available
              </div>
            </div>
          );
        }

        try {
          const startDate = new Date(event.start_date);
          const endDate = event.end_date ? new Date(event.end_date) : null;
          
          return (
            <div className="text-sm py-2">
              <div className="flex items-center text-gray-900 font-medium mb-1">
                <Calendar className="h-4 w-4 mr-1.5 text-gray-500" />
                {startDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
                {startDate.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              {endDate && endDate.getTime() !== startDate.getTime() && (
                <div className="text-gray-500 text-xs mt-1 ml-5">
                  to {endDate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              )}
            </div>
          );
        } catch (error) {
          return (
            <div className="text-sm text-red-500 py-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                Invalid date
              </div>
            </div>
          );
        }
      },
    },
    {
      key: 'status_column',
      label: 'Status',
      render: (value: any, event: Event) => {
        if (!event) return <span className="text-gray-400">N/A</span>;
        const { status, color, text } = getEventStatus(event);
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
            ${color === 'blue' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
              color === 'green' ? 'bg-green-100 text-green-800 border border-green-200' :
              'bg-gray-100 text-gray-800 border border-gray-200'}`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
              color === 'blue' ? 'bg-blue-500' :
              color === 'green' ? 'bg-green-500' :
              'bg-gray-500'
            }`}></span>
            {text}
          </span>
        );
      },
    },
    {
      key: 'actions_column',
      label: 'Actions',
      render: (value: any, event: Event) => (
        <div className="flex items-center justify-end space-x-1">
          {event?.id ? (
            <>
              <Link href={`/dashboard/events/${event.id}`}>
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/dashboard/events/${event.id}/edit`}>
                <Button variant="ghost" size="sm" className="hover:bg-purple-50 hover:text-purple-600">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
                <p className="text-gray-600 mt-1">
                  Manage school events and activities
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link href="/dashboard/events/create">
                <Button className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-6 bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-blue-900">{upcomingEvents}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ongoing</p>
                <p className="text-2xl font-bold text-green-900">{ongoingEvents}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Search className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Displayed</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 bg-white shadow-sm">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1 w-full">
                <Input
                  placeholder="Search events by title or description..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                  className="text-base"
                />
              </div>
              <Button variant="outline" onClick={fetchEvents} className="w-full sm:w-auto">
                Refresh
              </Button>
            </div>

            {/* Filters and Sorting Controls */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 pt-4 border-t border-gray-200">
              {/* Status Filter */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Status:</span>
                <div className="flex flex-wrap gap-2">
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto lg:ml-auto">
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Sort by:</span>
                <div className="flex flex-wrap gap-2">
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
                    {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Events Table */}
        <Card className="bg-white shadow-sm">
          <Table
            data={events}
            columns={columns}
            loading={loading}
            emptyMessage="No events found. Create your first event to get started!"
          />
        </Card>
      </div>
    </div>
  );
}
