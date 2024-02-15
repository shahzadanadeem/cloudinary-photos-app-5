"use client"

import { Heart } from '@/components/icon/heart';
import { CldImage } from 'next-cloudinary';
import { setAsFavoriteAction } from './actions';
import { useState, useTransition } from 'react';
import { SearchResult } from './page';
import { FullHeart } from '@/components/icon/full-heart';


export default function CloudinaryImage(props: any & {imageData: SearchResult; path: string}) {
    const [transition, startTransition] = useTransition();
    //const isFavorited = props.imageData.tags.includes('favorite');
    const [isFavorited, setIsFavorited] = useState(props.imageData.tags.includes('favorite')); 
    
    return (
        
        <div className='relative'>
            <CldImage {...props} src={props.imageData.public_id} />
            {isFavorited ? (
                <FullHeart 
                    onClick={() => {
                        setIsFavorited("false");
                        startTransition(() => {
                            setAsFavoriteAction(props.imageData.public_id, false, props.path);
                        });
                    }}
                    className='absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer' 
                />

            ) : (
                <Heart 
                    onClick={() => {
                        setIsFavorited("true");
                        startTransition(() => {
                            setAsFavoriteAction(props.imageData.public_id, true, props.path);
                        });
                    }}
                    className='absolute top-2 right-2 hover:text-red-500 cursor-pointer' 
                />

            )}
        </div>
    );
}