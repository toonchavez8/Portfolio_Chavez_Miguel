import { filterProjectsByStack } from '@/lib/projects';

const page = async ({ params }: { params: { slug: string } }) => {
    const filteredProjects = filterProjectsByStack(params.slug);

    return (
        <main>
            {filteredProjects.map((project) => (
                <div key={project.id}>
                    <h1> {project.name} </h1>
                </div>
            ))}
        </main>
    );
};

export default page;
