Contributions are very welcome. To make the process as easy as possible please follow these steps:

* Open an issue detailing the bug you've found, or the feature you wish to add.  Simplified working examples using something like [jsFiddle](http://jsfiddle.net) make it easier to diagnose your problem.
* Add tests for your code (so I don't accidentally break it in the future).
* Don't change version numbers as part of your changes.

# Developer Dependencies

An IDE that supports [dev containers](https://containers.dev/) is required for building the library.
Run the tests:

    make test

## `.devcontainer/.env`

See [.env.example](./devcontainer/.env.example) for a ready-to-copy-and-paste file

| ENV | Default | Description |
| - | - | - |
| `PORT_DOCS` | `8001` | Used to serve the HTML-formatted docs
| `PORT_COVERAGE` | `8002` | Used to serve the HTML-formatted coverage
| `PORT_TESTS` | `8003` | Used to serve the mocha test runner for browser testing
