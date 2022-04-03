const { UNAUTHENTICATED_ACCESS } = require('../constants')

const userUpdatesOwnContent = (id, authenticatedId) => (
  id === authenticatedId
    ? true
    : false
)

module.exports = (req, res, next) => {
  const updatesOwnContent = userUpdatesOwnContent(req.params.id, req.body.id);
  if (updatesOwnContent) next();
  else res.status(401).json({ message: UNAUTHENTICATED_ACCESS })
}
