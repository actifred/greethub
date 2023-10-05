// Mysteriously enough, Nx does not provide the project with the environment.
// If we need to deploy this project in prod, we would need to create first a .prod.ts file
// and add a fileReplacements section to the project.json file.
export const environment = {
    production: false,
    apiUrl: 'https://localhost:5001'
};