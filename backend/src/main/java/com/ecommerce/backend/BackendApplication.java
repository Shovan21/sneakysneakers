package com.ecommerce;

import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner seedDatabase(ProductRepository repository) {
		return args -> {
			if (repository.count() == 0) {
				String[][] sneakers = {
					// ── High-Tops ── (mix of all 3 ranges)
					{"Neon Cyber High-Top","Neon purple & pink high-top with a glowing futuristic aura. Bold limited-edition statement.","1899.00","10","High-Tops","/sneaker1.png"},
					{"Olive Safari High-Top","Rich olive green suede high-top with gold eyelets. Earthy, premium, effortlessly sophisticated.","2799.00","12","High-Tops","/sneaker4.png"},
					{"Burgundy Gold High-Top","Deep burgundy leather high-top with gold hardware. Opulent details, street-ready silhouette.","4499.00","6","High-Tops","/sneaker13.png"},
					{"Camo Tactical Boot","Military camo high-top with thick rubber outsole. Rugged utility meets urban street style.","1699.00","9","High-Tops","/sneaker16.png"},
					{"Electric Blue High-Top","Striking electric blue neon high-top with clean white sole. Impossible to ignore.","3299.00","14","High-Tops","/sneaker9.png"},
					{"Forest Green High-Top","Deep forest green chunky high-top. Natural tones, premium suede build, all-day comfort.","2199.00","11","High-Tops","/sneaker10.png"},
					{"Silver Chrome High-Top","Futuristic metallic chrome high-top. Light-catching reflective finish, bold statement piece.","5999.00","5","High-Tops","/sneaker12.png"},
					{"Crimson Fire High-Top","Bold crimson red high-top with black accents. Built for speed, styled for the streets.","1499.00","13","High-Tops","/sneaker2.png"},
					// ── Low-Tops ──
					{"Cloud White Luxe","All-white minimalist leather low-top. Buttery clean silhouette that pairs with anything.","3499.00","8","Low-Tops","/sneaker3.png"},
					{"Midnight Noir Low","All-black matte leather low-top. Minimal profile, maximum versatility.","4299.00","7","Low-Tops","/sneaker7.png"},
					{"Rose Gold Low Rider","Blush pink and rose gold low-top. Metallic sheen, chunky tongue, head-turning finish.","2599.00","10","Low-Tops","/sneaker8.png"},
					{"Lavender Dream Low","Pastel lavender chunky low-top platform. Soft dreamy colourway, bold chunky sole.","1799.00","9","Low-Tops","/sneaker15.png"},
					{"Retro Yellow Court","Vintage yellow & white court low-top. 90s basketball DNA, modern premium build.","999.00","16","Low-Tops","/sneaker14.png"},
					{"Navy Stealth Low","Sleek navy blue low-top runner profile. Clean, versatile, built to last.","1299.00","18","Low-Tops","/sneaker5.png"},
					{"Orange Volt Low","Bold volt orange and grey low-top. Performance-grade upper, street-ready sole.","2099.00","12","Low-Tops","/sneaker11.png"},
					{"Desert Sand Low","Camel tan suede low-top with crepe sole. Warm tones, minimal profile, classic appeal.","3799.00","15","Low-Tops","/sneaker6.png"},
					// ── Athletic ──
					{"Crimson Speedster","Crimson red athletic runner. Lightweight mesh, aggressive tread, built for the track.","1199.00","15","Athletic","/sneaker2.png"},
					{"Navy Silver Racer","Navy blue and silver performance runner. Aerodynamic upper, reactive cushioning.","2899.00","20","Athletic","/sneaker5.png"},
					{"Orange Volt Runner","Volt orange and grey high-performance runner. Maximum energy return on every stride.","3699.00","11","Athletic","/sneaker11.png"},
					{"Electric Sprint","Electric blue speed trainer. Featherlight build, aggressive traction, elite performance.","4799.00","8","Athletic","/sneaker9.png"},
					{"Midnight Trainer","All-black performance trainer. Matte upper, cushioned midsole, zero distractions.","1599.00","9","Athletic","/sneaker7.png"},
					{"Forest Trail Runner","Forest green trail runner with reinforced toe cap. Built for off-road adventures.","2499.00","14","Athletic","/sneaker10.png"},
					{"Silver Tech Racer","Metallic silver technical racer. Lightweight carbon-fibre inspired upper, race-day ready.","5499.00","4","Athletic","/sneaker12.png"},
					{"Camo Stealth Trainer","Camo print athletic trainer with thick rubber sole. Stealthy, rugged, performance-ready.","1399.00","13","Athletic","/sneaker16.png"},
					// ── Chunky ──
					{"Rose Gold Chunky","Blush pink and rose gold chunky sneaker. Metallic sheen, platform sole, all eyes on you.","2999.00","11","Chunky","/sneaker8.png"},
					{"Lavender Platform","Soft lavender chunky platform sneaker. Cloud-like sole unit, dreamy pastel colourway.","1849.00","8","Chunky","/sneaker15.png"},
					{"Forest Chunk","Forest green oversized chunky sneaker. Earthy tones, stacked midsole, maximalist vibes.","3599.00","7","Chunky","/sneaker10.png"},
					{"Retro Brick Chunky","Yellow & white chunky retro runner. Oversized profile, vintage spirit, modern cushioning.","1299.00","10","Chunky","/sneaker14.png"},
					{"Cloud Chunk White","All-white mega-chunky platform. Triple stacked foam midsole, luxury clean finish.","4199.00","6","Chunky","/sneaker3.png"},
					{"Noir Platform","All-black chunky platform sneaker. Matte upper, sculpted oversized sole, editorial-ready.","2699.00","5","Chunky","/sneaker7.png"},
					{"Burgundy Stacker","Burgundy leather chunky sneaker with stacked platform. Rich colour, bold proportions.","3899.00","8","Chunky","/sneaker13.png"},
					{"Electric Chunk","Electric blue chunky platform sneaker. Neon upper, sculpted midsole, statement silhouette.","1599.00","9","Chunky","/sneaker9.png"},
					// ── Casual ──
					{"Desert Drifter","Camel tan desert boot-sneaker hybrid with crepe sole. Warm, rugged, effortlessly classic.","1749.00","9","Casual","/sneaker6.png"},
					{"Olive Daily","Olive green suede casual sneaker. Easy-going silhouette for everyday premium comfort.","999.00","16","Casual","/sneaker4.png"},
					{"Blanc Casual","Clean white casual leather sneaker. Versatile, timeless, pairs with every outfit.","1199.00","20","Casual","/sneaker3.png"},
					{"Noir Everyday","All-black casual sneaker. Sleek enough for dinners, relaxed enough for the weekend.","2299.00","14","Casual","/sneaker7.png"},
					{"Retro Weekend","Vintage yellow casual low-top. Weekend-ready, lightweight, old-school cool.","799.00","18","Casual","/sneaker14.png"},
					{"Lavender Lounge","Pastel lavender casual sneaker. Soft colourway, cushioned footbed, effortless style.","1499.00","12","Casual","/sneaker15.png"},
					{"Navy Deck","Navy blue casual deck-inspired sneaker. Maritime heritage, clean profile, daily driver.","3199.00","15","Casual","/sneaker5.png"},
					{"Burgundy Weekend","Burgundy leather casual sneaker. Rich tones, premium finish, dressed-down luxury.","2099.00","11","Casual","/sneaker13.png"},
					// ── Limited ──
					{"Phantom Chrome","Ultra-limited metallic silver phantom. Only 50 pairs globally. Museum-worthy footwear.","7999.00","3","Limited","/sneaker12.png"},
					{"Gold Cyber One","Gold-tinted neon cyber silhouette. Collector edition with numbered insole.","6499.00","4","Limited","/sneaker1.png"},
					{"Noir Signature","Black signature edition by our head designer. Hand-finished leather, embossed logo.","8999.00","2","Limited","/sneaker7.png"},
					{"Camo Elite","Camo tactical limited-edition collab. Reinforced materials, exclusive colourway.","5299.00","5","Limited","/sneaker16.png"},
					{"Rose Collector","Rose gold collector chunky. Certificate of authenticity included. 100 pairs only.","4999.00","6","Limited","/sneaker8.png"},
					{"Burgundy Heritage","Burgundy heritage limited drop. Hand-stitched upper, aged leather, timeless silhouette.","6999.00","4","Limited","/sneaker13.png"},
					{"Electric Aurora","Electric blue aurora edition. Colour-shifting upper, glow-in-dark sole trim.","5799.00","5","Limited","/sneaker9.png"},
					{"Retro OG","Original colourway reissue. Exact replica of the 1994 original, premium materials.","4299.00","8","Limited","/sneaker14.png"},
					{"Lavender Haze Limited","Soft lavender haze drop. Collaboration with a Paris-based artist collective.","5499.00","6","Limited","/sneaker15.png"},
					{"Forest Phantom","Forest green limited phantom run. Waterproof treated suede, serialised tongue tag.","4699.00","7","Limited","/sneaker10.png"}
				};
				for (String[] s : sneakers) {
					Product p = new Product();
					p.setName(s[0]); p.setDescription(s[1]);
					p.setPrice(Double.parseDouble(s[2]));
					p.setQuantity(Integer.parseInt(s[3]));
					p.setCategory(s[4]); p.setImageUrl(s[5]);
					repository.save(p);
				}
			}
		};
	}

}
