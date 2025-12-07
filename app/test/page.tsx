import { dataTransformerToCamelCase, dataTransformerToSnakeCase } from "@/utils/data-transformer";




export default function TestPage() {
    return (
        <div>
            <h1>{JSON.stringify(dataTransformerToSnakeCase({primaryEmail:"test",secondaryUserEmail:"test2"}))}</h1>
        </div>
    );
}