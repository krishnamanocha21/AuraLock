const asyncHandler = (requestHandler) => {
return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
};
};
//we are accepting a function and returing it back

export { asyncHandler };