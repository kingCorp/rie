import ApiHandler from './ApiHandler';

const Api = {
  auth: {
    signInEmail: (data: object) => ApiHandler.post('/user/login', data),
    signInOrganizerEmail: (data: object) => ApiHandler.post('/organizer/login', data),
    signUpEmail: (data: object) => ApiHandler.post('/user/register', data),
    signUpOrganizerEmail: (data: object) => ApiHandler.post('/organizer/register', data),
    changePassword: (data: object) => ApiHandler.post('/change_password', data),
    resendToken: (data: object) => ApiHandler.post('/send_token', data),
    refreshToken: (data: object) => ApiHandler.post('/user/refresh-token', data),
    logout: (data: object) => ApiHandler.post('/user/logout', data),
    sendResetTokenUser: (data: object) => ApiHandler.post('/user/send_token', data),
    sendResetTokenOrganizer: (data: object) => ApiHandler.post('/organizer/send_token', data),
    changePasswordUser: (data: object) => ApiHandler.post('/user/change_password', data),
    changePasswordOrganizer: (data: object) => ApiHandler.post('/organizer/change_password', data),
    addOrganizerAccountDetails: (data: object) => ApiHandler.post('/organizer/account/add', data),
  },
  user: {
    userDetails: () => ApiHandler.get('/user/getInfo'),
  },
  events: {
    events: () => ApiHandler.get('/show/all'),
    event: (id: string) => ApiHandler.get(`/show/details/${id}`),
    getOrganizerEvents: () => ApiHandler.get('/organizer/shows'),
    createEvent: (data: object) => ApiHandler.post('/organizer/show/create', data),
    createTicket: (data: object) => ApiHandler.post('/organizer/show/ticket/create', data),
    checkInTicket: (data: object, showID: string) =>
      ApiHandler.post(`/organizer/show/ticket/check_in/${showID}`, data),
    checkOutTicket: (data: object, showId: string) =>
      ApiHandler.post(`/organizer/show/ticket/check_out/${showId}`, data),
    createOneTicket: (data: object) => ApiHandler.post('/organizer/show/ticket/addOne', data),
    getTickets: (showId: string) => ApiHandler.get(`/organizer/show/tickets/${showId}`),
    editEvent: (showId: string, data: object) =>
      ApiHandler.put(`/organizer/show/edit/${showId}`, data),
    editTicket: (id: string, data: object) => ApiHandler.put(`/organizer/ticket/edit/${id}`, data),
    payTicket: (data: object) => ApiHandler.post('/user/tickets/pay', data),
    goLiveEvent: (data: object) => ApiHandler.post('/organizer/show/go_live', data),
    getUserTickets: () => ApiHandler.get('/user/tickets'),
    searchTicket: (data: object) => ApiHandler.post('/organizer/show/searchByCode', data),
  },
  places: {
    searchPlaces: (key: string, input: string) => ApiHandler.getplaces(`key=${key}&input=${input}`),
  },
  admin: {
    signIn: (data: object) => ApiHandler.post('/admin/login', data),
    details: () => ApiHandler.get('/admin/details'),
    users: () => ApiHandler.get('/admin/user/all'),
    organizers: () => ApiHandler.get('/admin/organizer/all'),
    showTickets: (showID: string) => ApiHandler.get(`/admin/show/tickets/${showID}`),
    setCommission: (data: object) => ApiHandler.post('/admin/show/setCommission', data),
    closeShow: (data: object) => ApiHandler.post('/admin/show/close', data),
    showDelete: (showId: string) => ApiHandler.delete(`/admin/show/delete/${showId}`),
  },
};

export default Api;
