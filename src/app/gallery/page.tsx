import CloudinaryImage from "./cloudinary-image";
import UploadButton from "./upload-button";
import cloudinary from "cloudinary";

export type SearchResult = {
    public_id: string;
    tags: string[];
};

export default async function GalleryPage() {

    const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as {resources: SearchResult[]};

    return (
        <section>
            <div className="flex flex-col gap-8">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">GALLERY</h1>
                    <UploadButton />
                </div>    
                
                <div className="grid grid-cols-4 gap-4">
                {results.resources.map((result) => (
                    <CloudinaryImage 
                        key={result.public_id}
                        //src={result.public_id}
                        //publicId={result.public_id}
                        path="/gallery"
                        imageData={result}
                        width="400"
                        height="300"
                        alt="An image of something"
                    />
                    
                ))}
                </div>

            </div>
        </section>
    );
}