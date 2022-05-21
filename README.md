# gold-splitter
A gold splitting calculator for D&amp;D

https://shadowedgold.github.io/gold-splitter/

### What doesn't it handle yet?

If you put in less than a copper worth of stuff (eg 0.1 in the copper field, or 0.01 in the silver field).

### What's the difference between splitting in the town and dungeon?

If you split in town, you can do coin conversion (break or fuse denominations up and down).

If you split in the dungeon, we're just going to divide up the physical coins into piles. The dungeon bag takes all coins that couldn't be evenly divided.

The party would then divide the dungeon bag coins in town if they wanted to evenly split them amongst the party.

### How do checkboxes behave?

Ignored if you are splitting in the dungeon.

If you are splitting in town...

We will try to give back the party rewards in the currencies you have checked. Spare change goes to the MVP in the most optimal format.

Eg; say you have 5055 copper, and you check PP and GP. This means the party wants everything divided to the nearest GP. That's 50gp / 6 = 8gp each (48 total). Then the MVP gets everything left over on top of that in the most optimal format (+extra 2gp 5sp 5cp, for 1pp 5sp 5cp total).

If you check GP and CP, but not SP, that means we won't divide in SP for the main party or the MVP. All change will be handed out in GP or CP.

If you uncheck all the boxes, everything is considered unwanted small change, and the MVP gets everything in CP.


### How does coin weight work?

As per D&D's Basic Rules: Chapter 5, Wealth, Coinage...  
"A standard coin weighs about a third of an ounce, so fifty coins weigh a pound."

D&D Beyond also seems to use this measurement; each coin weights 0.02 lb.
