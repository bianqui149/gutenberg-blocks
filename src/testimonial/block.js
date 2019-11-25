const { MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// Import our CSS files
import './style.scss';
import './editor.scss';

registerBlockType( 'card-block/main', {
	title: 'Modulo Leer Más',
	icon: 'camera',
	category: 'common',
	attributes: {
		title: {
			selector: '.news__title',
			attribute: 'title',
		},
		url: {
			selector: '.news__title',
			attribute: 'href',
		},
		imageAlt: {
			attribute: 'alt',
			selector: '.card__image',
		},
		imageUrl: {
			attribute: 'src',
			selector: '.card__image',
		}
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

		return (
			<div className="wp-block-nelio-testimonial-block">
				<div className="">
					<MediaUpload
						onSelect={media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); }}
						type="image"
						value={attributes.imageID}
						render={({ open }) => getImageButton(open)}
					/>
				</div>
				<div className="nelio-testimonial-content">
					<PlainText
						onChange={content => setAttributes({ title: content })}
						value={attributes.title}
						placeholder="Titulo"
						className="heading"
					/>
					<PlainText
						onChange={content => setAttributes({ url: content })}
						value={attributes.url}
						placeholder="Link"
						className="heading"
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
					/>
				);
			}

			// No alt set, so let's hide it from screen readers
			return (
				<img
					src={ src }
					alt=""
					aria-hidden="true"
				/>
			);
		};
		const cardTitle = (href, title) => {

			
				return (
					<a
						href={href}
					>{title}</a>
				);
			
		};
		return (
			<div className="card">
				<article className="news news--summary news--55-81">
					<figure className="news__media">
						{ cardImage( attributes.imageUrl, attributes.imageAlt ) }
					</figure>
					<div className="news__data">
						<span className="news__section">Lee Tambien</span>
						<div className="card__content">
							<h2 className="news__title">
								{ cardTitle(attributes.url, attributes.title ) }
							</h2>

						</div>
					</div>
				</article>
			</div>
		);
	}
});