import './index.css'
import ReactDOM from 'react-dom'

interface AppInitializationErr {
    code: 'app-initialization-error',
    description: string
}

class AppInitializationError extends Error {
    code = 'app-initialization-error' as const
    description: string

    constructor(description: string) {
        super()
        this.description = description
    }

    toJSON(): AppInitializationErr {
        return {
            code: this.code,
            description: this.description
        }
    }

    toString() {
        return JSON.stringify(this.toJSON())
    }
}

const ROOT_ELEMENT_ID = 'app'

function main() {
    console.log('test')
    const rootElement = document.getElementById(ROOT_ELEMENT_ID)
    if (rootElement == null) {
        throw new AppInitializationError(`Could not find root element to render react into, expected ${ROOT_ELEMENT_ID}`)
    }

    ReactDOM.createRoot(rootElement)
}

main()
