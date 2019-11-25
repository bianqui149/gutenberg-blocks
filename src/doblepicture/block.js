const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// Import our CSS files
import './style.scss';
import './editor.scss';

registerBlockType( 'card-block-picture/main', {
	title: 'Foto Doble',
	icon: 'images-alt2',
	category: 'common',
	attributes: {
		imageAlt: {
			attribute: 'alt',
			selector: '.gallery__item',
		},
		imageUrl: {
			attribute: 'src',
			selector: '.gallery__item',
		},
		imageAlt_two: {
			attribute: 'alt',
			selector: '.gallery__item',
		},
		imageUrl_two: {
			attribute: 'src',
			selector: '.gallery__item',
		},
	},
	edit({ attributes, className, setAttributes }) {

		const getImageButton = (openEvent) => {
			if (attributes.imageUrl) {
				return (
					<img
						src={attributes.imageUrl}
						onClick={openEvent}
						className="image"
					/>
				);
			}
			else {
				return (
					<div className="button-container">
						<Button
							onClick={openEvent}
							className="button button-large"
						>
							Elija una Imagen
            </Button>
					</div>
				);
			}
		};
		const getImageButton_two = (openEvent) => {
			if (attributes.imageUrl_two) {
				return (
					<img
						src={attributes.imageUrl_two}
						onClick={openEvent}
						className="image"
					/>
				);
			}
			else {
				return (
					<div className="button-container">
						<Button
							onClick={openEvent}
							className="button button-large"
						>
							Elija una Imagen
            </Button>
					</div>
				);
			}
		};

		return (
			<div className="wp-block-nelio-testimonial-block">
				<div className="img-card-block">
					<MediaUpload
						onSelect={media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); }}
						type="image"
						value={attributes.imageID}
						render={({ open }) => getImageButton(open)}
					/>
				</div>
				<div className="img-card-block"> 
					<MediaUpload
						onSelect={media => { setAttributes({ imageAlt_two: media.alt, imageUrl_two: media.url }); }}
						type="image"
						value={attributes.imageID}
						render={({ open }) => getImageButton_two(open)}
					/>
				</div>
			</div>
		);

	},

	save( { attributes } ) {

		const cardImage = ( src, alt ) => {
			if ( ! src ) return null;

			if ( alt ) {
				return (
					<img
						src={ src }
						alt={ alt }
						width="620"
						height="320"
					/>
				);
			}

			// No alt set, so let's hide it from screen readers
			return (
				<img
					src={ src }
					alt=""
					aria-hidden="true"
					width="620"
					height="320"
				/>
			);
		};
		return (
			<div className="card">
				<figure className="gallery">
					<div className="gallery__items">
						<div className="gallery__item">
							{cardImage(attributes.imageUrl, attributes.imageAlt)}
						</div>
						<div className="gallery__item">
							{cardImage(attributes.imageUrl_two, attributes.imageAlt_two)}
						</div>
					</div>
				</figure>
			</div>
		);
	}
});